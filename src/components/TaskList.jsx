import React, { useState, useEffect, useRef } from 'react';
import { Check, Circle, Info, Lightbulb } from 'lucide-react';
import { updateTaskCompletion } from '../lib/statisticsUtils';
import './TaskList.css';

/**
 * Task List Component
 * Allows users to create, check off, and reorder tasks for their writing session
 */
const TaskList = ({ sessionMode, isTimerRunning }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('mercurial-tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate existing tasks to include hasBeenCompleted field
        return parsed.map(task => ({
          ...task,
          hasBeenCompleted: task.hasBeenCompleted ?? task.completed // If already completed, mark as having been completed
        }));
      }
      return [];
    } catch {
      return [];
    }
  });
  
  const [newTaskText, setNewTaskText] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isToggling, setIsToggling] = useState(false);
  const processedUpdates = useRef(new Set());

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('mercurial-tasks', JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  // Add new task
  const handleAddTask = () => {
    if (newTaskText.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTaskText.trim(), 
        completed: false,
        hasBeenCompleted: false, // Track if task was ever completed
        sessionMode: sessionMode
      }]);
      setNewTaskText('');
    }
  };

  // Handle Enter key to add task
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

    // Toggle task completion
  const toggleTask = (index) => {
    if (isToggling) {
      return;
    }
    
    setIsToggling(true);
    
    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      const oldTask = newTasks[index];
      
      if (!oldTask) {
        setIsToggling(false);
        return prevTasks;
      }
      
      const wasCompleted = oldTask.completed;
      const willBeCompleted = !wasCompleted;
      const wasEverCompleted = oldTask.hasBeenCompleted ?? wasCompleted;
      
      // Create NEW task object (don't mutate existing)
      const newTask = {
        ...oldTask,
        completed: willBeCompleted,
        hasBeenCompleted: willBeCompleted ? true : false
      };
      
      // Replace the task in the array
      newTasks[index] = newTask;
      
      // Update statistics (deferred to avoid React render conflicts)
      setTimeout(() => {
        // Create unique ID for this update to prevent duplicates
        const updateId = `${oldTask.id}-${Date.now()}-${willBeCompleted}`;
        
        if (processedUpdates.current.has(updateId)) {
          setIsToggling(false);
          return;
        }
        
        processedUpdates.current.add(updateId);
        
        // Clean old entries to prevent memory leak (keep only last 100)
        if (processedUpdates.current.size > 100) {
          const entries = Array.from(processedUpdates.current);
          processedUpdates.current = new Set(entries.slice(-50));
        }
        
        if (willBeCompleted && !wasEverCompleted) {
          updateTaskCompletion(true);
          window.dispatchEvent(new CustomEvent('task-completed'));
        } else if (!willBeCompleted && wasEverCompleted) {
          updateTaskCompletion(false);
        }
        
        setIsToggling(false);
      }, 0);
      
      return newTasks;
    });
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Clear completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // Drag and drop handlers
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    
    const newTasks = [...tasks];
    const draggedTask = newTasks[draggedIndex];
    newTasks.splice(draggedIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);
    
    setTasks(newTasks);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Get stats
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="task-list-container">
      {/* Section Header */}
      <div className="section-title">
        <span>Task List</span>
        <span 
          className="info-tooltip" 
          title="You can export your task lists via App Settings > Backup"
        >
          <Info size={14} />
        </span>
      </div>
      
      {/* Task Stats */}
      {totalCount > 0 && (
        <div className="task-stats">
          <span>{completedCount} of {totalCount} completed</span>
          {completedCount > 0 && (
            <button 
              onClick={clearCompleted}
              className="clear-completed-btn"
              title="Clear completed tasks"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Clear <Check size={14} />
              </span>
            </button>
          )}
        </div>
      )}

      {/* Add Task Input */}
      <div className="add-task-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="task-input"
        />
        <button 
          onClick={handleAddTask}
          disabled={!newTaskText.trim()}
          className="add-task-btn"
          title="Add task"
        >
          +
        </button>
      </div>

      {/* Task List */}
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''} ${draggedIndex === index ? 'dragging' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
            >
              {/* Drag Handle */}
              <div className="drag-handle" title="Drag to reorder">
                ⋮⋮
              </div>

              {/* Checkbox */}
              <button
                className="task-checkbox"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTask(index);
                }}
                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {task.completed ? (
                  <Check size={16} className="checkmark" />
                ) : (
                  <Circle size={16} className="empty-circle" />
                )}
              </button>

              {/* Task Text */}
              <span className="task-text">{task.text}</span>

              {/* Delete Button */}
              <button
                className="delete-task-btn"
                onClick={() => deleteTask(task.id)}
                title="Delete task"
                aria-label="Delete task"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Clear Completed Button */}
      {tasks.some(task => task.completed) && (
        <div className="task-actions">
          <button
            className="clear-completed-btn"
            onClick={clearCompleted}
            title="Clear all completed tasks"
          >
            Clear Completed
          </button>
        </div>
      )}

      {/* Timer Warning */}
      {isTimerRunning && tasks.filter(t => !t.completed).length > 0 && (
        <div className="timer-reminder">
          <small><Lightbulb size={14} style={{verticalAlign: 'middle', marginRight: '4px'}} /> Focus on your tasks during this session!</small>
        </div>
      )}
    </div>
  );
};

export default TaskList;
