// FREEMASONRY Authentication System
// MCP Server Integration and User Management

class FreemasonryAuth {
    constructor() {
        this.currentUser = null;
        this.mcpServer = null;
        this.userProfiles = new Map();
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.initializeMCP();
        this.loadStoredUsers();
        this.checkAuthStatus();
    }

    setupEventListeners() {
        // Form switching
        document.querySelectorAll('.switch-form').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetForm = link.dataset.form;
                this.switchForm(targetForm);
            });
        });

        // Form submissions
        document.getElementById('loginFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('signupFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        document.getElementById('profileFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProfileSetup();
        });

        // Password toggle
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = btn.dataset.target;
                this.togglePasswordVisibility(targetId);
            });
        });

        // Avatar upload
        document.getElementById('avatarInput').addEventListener('change', (e) => {
            this.handleAvatarUpload(e);
        });

        // Modal close buttons
        document.getElementById('closeSuccessModal').addEventListener('click', () => {
            this.closeModal('successModal');
        });

        document.getElementById('closeErrorModal').addEventListener('click', () => {
            this.closeModal('errorModal');
        });

        document.getElementById('closeErrorBtn').addEventListener('click', () => {
            this.closeModal('errorModal');
        });

        document.getElementById('goToDashboard').addEventListener('click', () => {
            this.goToDashboard();
        });

        // Form validation
        this.setupFormValidation();
    }

    async initializeMCP() {
        try {
            console.log('Initializing MCP server connection...');
            
            // Simulate MCP server connection
            this.mcpServer = {
                connected: true,
                sendMessage: async (message) => {
                    console.log('MCP Message:', message);
                    return { success: true, data: 'MCP response' };
                }
            };

            console.log('MCP Server connected successfully');
        } catch (error) {
            console.error('MCP Server connection failed:', error);
        }
    }

    switchForm(formType) {
        // Hide all forms
        document.querySelectorAll('.form-container').forEach(form => {
            form.classList.add('hidden');
        });

        // Show target form
        const targetForm = document.getElementById(formType + 'Form');
        if (targetForm) {
            targetForm.classList.remove('hidden');
        }

        // Update active state
        document.querySelectorAll('.switch-form').forEach(link => {
            link.classList.remove('active');
        });

        document.querySelector(`[data-form="${formType}"]`).classList.add('active');
    }

    async handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (!this.validateLoginForm(email, password)) {
            return;
        }

        this.showLoading();

        try {
            // Simulate API call
            await this.simulateApiCall(1000);

            const user = this.authenticateUser(email, password);
            
            if (user) {
                this.currentUser = user;
                this.saveUserSession(user, rememberMe);
                this.showSuccessModal('Welcome back, Brother ' + user.firstName + '!');
                
                // Send to MCP server
                if (this.mcpServer) {
                    await this.mcpServer.sendMessage({
                        type: 'user_login',
                        data: { userId: user.id, email: user.email }
                    });
                }
            } else {
                this.showErrorModal('Invalid email or password. Please try again.');
            }
        } catch (error) {
            this.showErrorModal('Login failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async handleSignup() {
        const formData = this.getSignupFormData();
        
        if (!this.validateSignupForm(formData)) {
            return;
        }

        this.showLoading();

        try {
            // Simulate API call
            await this.simulateApiCall(1500);

            const newUser = this.createUser(formData);
            this.userProfiles.set(newUser.id, newUser);
            this.saveUserProfiles();

            // Send to MCP server
            if (this.mcpServer) {
                await this.mcpServer.sendMessage({
                    type: 'user_signup',
                    data: { userId: newUser.id, email: newUser.email }
                });
            }

            this.currentUser = newUser;
            this.switchForm('profile');
        } catch (error) {
            this.showErrorModal('Account creation failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async handleProfileSetup() {
        const formData = this.getProfileFormData();
        
        if (!this.validateProfileForm(formData)) {
            return;
        }

        this.showLoading();

        try {
            // Simulate API call
            await this.simulateApiCall(1000);

            // Update user profile
            Object.assign(this.currentUser, formData);
            this.userProfiles.set(this.currentUser.id, this.currentUser);
            this.saveUserProfiles();

            // Send to MCP server
            if (this.mcpServer) {
                await this.mcpServer.sendMessage({
                    type: 'profile_update',
                    data: { userId: this.currentUser.id, profile: formData }
                });
            }

            this.showSuccessModal('Profile completed successfully!');
        } catch (error) {
            this.showErrorModal('Profile setup failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    getSignupFormData() {
        return {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('signupEmail').value,
            lodgeNumber: document.getElementById('lodgeNumber').value,
            degree: document.getElementById('degree').value,
            password: document.getElementById('signupPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };
    }

    getProfileFormData() {
        return {
            bio: document.getElementById('bio').value,
            location: document.getElementById('location').value,
            phone: document.getElementById('phone').value,
            interests: document.getElementById('interests').value,
            avatar: this.currentUser.avatar || null
        };
    }

    validateLoginForm(email, password) {
        let isValid = true;

        // Clear previous errors
        this.clearFormErrors('loginFormElement');

        if (!email) {
            this.showFieldError('loginEmail', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            this.showFieldError('loginEmail', 'Please enter a valid email');
            isValid = false;
        }

        if (!password) {
            this.showFieldError('loginPassword', 'Password is required');
            isValid = false;
        }

        return isValid;
    }

    validateSignupForm(data) {
        let isValid = true;

        // Clear previous errors
        this.clearFormErrors('signupFormElement');

        if (!data.firstName) {
            this.showFieldError('firstName', 'First name is required');
            isValid = false;
        }

        if (!data.lastName) {
            this.showFieldError('lastName', 'Last name is required');
            isValid = false;
        }

        if (!data.email) {
            this.showFieldError('signupEmail', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(data.email)) {
            this.showFieldError('signupEmail', 'Please enter a valid email');
            isValid = false;
        }

        if (!data.degree) {
            this.showFieldError('degree', 'Please select your degree');
            isValid = false;
        }

        if (!data.password) {
            this.showFieldError('signupPassword', 'Password is required');
            isValid = false;
        } else if (data.password.length < 8) {
            this.showFieldError('signupPassword', 'Password must be at least 8 characters');
            isValid = false;
        }

        if (!data.confirmPassword) {
            this.showFieldError('confirmPassword', 'Please confirm your password');
            isValid = false;
        } else if (data.password !== data.confirmPassword) {
            this.showFieldError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }

        if (!document.getElementById('agreeTerms').checked) {
            this.showFieldError('agreeTerms', 'Please agree to the terms and conditions');
            isValid = false;
        }

        return isValid;
    }

    validateProfileForm(data) {
        let isValid = true;

        // Clear previous errors
        this.clearFormErrors('profileFormElement');

        if (data.phone && !this.isValidPhone(data.phone)) {
            this.showFieldError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        return isValid;
    }

    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        formGroup.classList.add('error');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }

    clearFormErrors(formId) {
        const form = document.getElementById(formId);
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    authenticateUser(email, password) {
        const users = Array.from(this.userProfiles.values());
        return users.find(user => 
            user.email.toLowerCase() === email.toLowerCase() && 
            user.password === password
        );
    }

    createUser(formData) {
        const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        return {
            id: userId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            lodgeNumber: formData.lodgeNumber,
            degree: formData.degree,
            password: formData.password,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            avatar: null,
            bio: '',
            location: '',
            phone: '',
            interests: ''
        };
    }

    saveUserSession(user, rememberMe) {
        const sessionData = {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            degree: user.degree,
            lastLogin: new Date().toISOString()
        };

        if (rememberMe) {
            localStorage.setItem('freemasonry_session', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('freemasonry_session', JSON.stringify(sessionData));
        }
    }

    saveUserProfiles() {
        const profiles = Array.from(this.userProfiles.values());
        localStorage.setItem('freemasonry_users', JSON.stringify(profiles));
    }

    loadStoredUsers() {
        const storedUsers = localStorage.getItem('freemasonry_users');
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            users.forEach(user => {
                this.userProfiles.set(user.id, user);
            });
        }
    }

    checkAuthStatus() {
        const session = localStorage.getItem('freemasonry_session') || sessionStorage.getItem('freemasonry_session');
        if (session) {
            const sessionData = JSON.parse(session);
            const user = this.userProfiles.get(sessionData.userId);
            if (user) {
                this.currentUser = user;
                this.goToDashboard();
            }
        }
    }

    togglePasswordVisibility(fieldId) {
        const field = document.getElementById(fieldId);
        const toggleBtn = document.querySelector(`[data-target="${fieldId}"]`);
        const icon = toggleBtn.querySelector('i');

        if (field.type === 'password') {
            field.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            field.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarPreview = document.getElementById('avatarPreview');
                avatarPreview.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
                
                if (this.currentUser) {
                    this.currentUser.avatar = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.add('active');
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.remove('active');
    }

    showSuccessModal(message) {
        const modal = document.getElementById('successModal');
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <p>${message}</p>
            <p>You can now access all lodge resources and connect with your brothers.</p>
        `;
        modal.classList.add('active');
    }

    showErrorModal(message) {
        const modal = document.getElementById('errorModal');
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = message;
        modal.classList.add('active');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    }

    goToDashboard() {
        // Redirect to dashboard or home menu
        window.location.href = '../home-menu/index.html';
    }

    setupFormValidation() {
        // Real-time validation
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const fieldId = field.id;

        // Clear previous error
        this.clearFieldError(field);

        // Validate based on field type
        switch (fieldId) {
            case 'loginEmail':
            case 'signupEmail':
                if (field.value && !this.isValidEmail(field.value)) {
                    this.showFieldError(fieldId, 'Please enter a valid email');
                }
                break;
            case 'signupPassword':
                if (field.value && field.value.length < 8) {
                    this.showFieldError(fieldId, 'Password must be at least 8 characters');
                }
                break;
            case 'confirmPassword':
                const password = document.getElementById('signupPassword').value;
                if (field.value && field.value !== password) {
                    this.showFieldError(fieldId, 'Passwords do not match');
                }
                break;
            case 'phone':
                if (field.value && !this.isValidPhone(field.value)) {
                    this.showFieldError(fieldId, 'Please enter a valid phone number');
                }
                break;
        }
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    async simulateApiCall(delay) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
    }

    // Utility methods for MCP integration
    async sendToMCP(type, data) {
        if (this.mcpServer && this.mcpServer.connected) {
            try {
                await this.mcpServer.sendMessage({
                    type: type,
                    data: data,
                    timestamp: new Date().toISOString()
                });
            } catch (error) {
                console.error('MCP communication failed:', error);
            }
        }
    }

    // User profile management
    updateUserProfile(userId, updates) {
        const user = this.userProfiles.get(userId);
        if (user) {
            Object.assign(user, updates);
            this.userProfiles.set(userId, user);
            this.saveUserProfiles();
        }
    }

    getUserProfile(userId) {
        return this.userProfiles.get(userId);
    }

    getAllUsers() {
        return Array.from(this.userProfiles.values());
    }

    // Session management
    logout() {
        this.currentUser = null;
        localStorage.removeItem('freemasonry_session');
        sessionStorage.removeItem('freemasonry_session');
        window.location.reload();
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize the authentication system
const authSystem = new FreemasonryAuth();

// Export for global access
window.authSystem = authSystem;

// Demo data for testing
function loadDemoData() {
    const demoUsers = [
        {
            id: 'demo_user_1',
            firstName: 'John',
            lastName: 'Smith',
            email: 'john.smith@freemasonry.com',
            lodgeNumber: '#123',
            degree: 'master-mason',
            password: 'password123',
            createdAt: '2024-01-15T10:00:00Z',
            lastLogin: '2024-01-15T10:00:00Z',
            avatar: null,
            bio: 'Dedicated brother committed to the principles of Freemasonry.',
            location: 'New York, NY',
            phone: '(555) 123-4567',
            interests: 'History, Philosophy, Charity Work'
        },
        {
            id: 'demo_user_2',
            firstName: 'Michael',
            lastName: 'Johnson',
            email: 'michael.johnson@freemasonry.com',
            lodgeNumber: '#456',
            degree: 'fellow-craft',
            password: 'password123',
            createdAt: '2024-01-10T14:30:00Z',
            lastLogin: '2024-01-14T16:45:00Z',
            avatar: null,
            bio: 'Fellow Craft working towards Master Mason degree.',
            location: 'Los Angeles, CA',
            phone: '(555) 987-6543',
            interests: 'Education, Community Service'
        }
    ];

    demoUsers.forEach(user => {
        authSystem.userProfiles.set(user.id, user);
    });
    authSystem.saveUserProfiles();
}

// Load demo data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDemoData();
}); 