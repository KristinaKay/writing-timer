import React, { useState, useEffect } from 'react';
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
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [newTaskText, setNewTaskText] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

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
  const toggleTask = (id) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    // If the task was just marked completed, increment statistics
    const toggled = newTasks.find(t => t.id === id);
    if (toggled && toggled.completed) {
      try {
        updateTaskCompletion();
      } catch {
        // ignore failures updating global statistics
      }
    }
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
              Clear ✓
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
                onClick={() => toggleTask(task.id)}
                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {task.completed && <span className="checkmark">✓</span>}
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

      {/* Timer Warning */}
      {isTimerRunning && tasks.filter(t => !t.completed).length > 0 && (
        <div className="timer-reminder">
          <small>💡 Focus on your tasks during this session!</small>
        </div>
      )}
    </div>
  );
};

export default TaskList;
