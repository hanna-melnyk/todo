import authApi from './axiosTokenInterceptor';

/**
 * Fetch all todos based on the provided search parameters.
 * @param {Object} params - Query parameters for filtering or searching todos.
 * @returns {Promise} Promise that resolves to the list of todos.
 */
export const fetchTodosRequest = (params = {}) => {
    return authApi.get('/todos', { params });
};

/**
 * Add a new todo item.
 * @param {Object} newTodo - The todo item to be added.
 * @returns {Promise} Promise that resolves to the created todo.
 */
export const addTodoRequest = (newTodo) => {
    return authApi.post('/todos', newTodo);
};

/**
 * Update an existing todo.
 * @param {string} id - The ID of the todo to be updated.
 * @param {Object} updatedTodo - The updated todo object.
 * @returns {Promise} Promise that resolves to the updated todo.
 */
export const updateTodoRequest = (id, updatedTodo) => {
    return authApi.put(`/todos/${id}`, updatedTodo);
};


/**
 * Toggle the completion status of a todo by updating only the "completed" field.
 * @param {string} id - The ID of the todo to be updated.
 * @param {boolean} completed - The new completed status.
 * @returns {Promise} Promise that resolves to the updated todo.
 */
export const toggleTodoRequest = (id, completed) => {
    return authApi.patch(`/todos/${id}/completed`, { completed });  // Use PATCH to update only the `completed` field
};

/**
 * Delete a todo by ID.
 * @param {string} id - The ID of the todo to be deleted.
 * @returns {Promise} Promise that resolves when the todo is deleted.
 */
export const deleteTodoRequest = (id) => {
    return authApi.delete(`/todos/${id}`);
};
