// Navigation Component - Dynamically injects header and sidebar
(function() {
    // Get current page from body data attribute
    const currentPage = document.body.dataset.page || 'home';
    
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const isLoggedIn = userId && userName;
    
    // Navigation HTML template
    const navHTML = `
        <!-- Header -->
        <header class="header">
            <div class="container">
                <div class="header-left">
                    <button class="sidebar-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
                    <!-- Logo -->
                    <div class="logo">
                        <div class="logo-icon">🎓</div>
                        <span class="logo-text">ELEVARE</span>
                    </div>
                </div>
                
                <!-- Auth Section - changes based on login state -->
                <div class="auth">
                    ${isLoggedIn 
                        ? `<a href="profile.html" class="user-profile-link">
                               <div class="user-avatar">👤</div>
                               <span class="user-name">${userName}</span>
                           </a>`
                        : `<a href="signin.html" class="sign-in">Sign In</a>`
                    }
                </div>
            </div>
        </header>

        <!-- Sidebar Navigation -->
        <aside class="sidebar" aria-hidden="true">
            <div class="sidebar-header">
                <div class="logo">
                    <div class="logo-icon">🎓</div>
                    <span class="logo-text">ELEVARE</span>
                </div>
                <button class="sidebar-close" aria-label="Close navigation">✕</button>
            </div>
            <nav class="nav">
                <a href="index.html" class="nav-link" data-page="home">HOME</a>
                <a href="courses.html" class="nav-link" data-page="courses">COURSES</a>
                <a href="internships.html" class="nav-link" data-page="internships">INTERNSHIPS</a>
                <a href="portfolio.html" class="nav-link" data-page="portfolio">PORTFOLIO</a>
                <a href="mentorship.html" class="nav-link" data-page="mentorship">MENTORSHIP</a>
                <a href="contact.html" class="nav-link" data-page="contact">CONTACT</a>
                <a href="blog.html" class="nav-link" data-page="blog">BLOG</a>
                <a href="resources.html" class="nav-link" data-page="resources">RESOURCES</a>
                <a href="profile.html" class="nav-link" data-page="profile">PROFILE</a>
                ${isLoggedIn 
                    ? `<a href="#" class="nav-link" id="logoutBtn" style="color: #ff6b6b; margin-top: 20px;">LOGOUT</a>`
                    : ''
                }
            </nav>
        </aside>
        <div class="sidebar-overlay" tabindex="-1" aria-hidden="true"></div>
    `;
    
    // Inject navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Highlight active page
    const activeLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Sidebar toggle functionality
    const body = document.body;
    const toggle = document.querySelector('.sidebar-toggle');
    const closeBtn = document.querySelector('.sidebar-close');
    const overlay = document.querySelector('.sidebar-overlay');
    
    function openSidebar() {
        body.classList.add('sidebar-open');
        toggle && toggle.setAttribute('aria-expanded', 'true');
    }
    
    function closeSidebar() {
        body.classList.remove('sidebar-open');
        toggle && toggle.setAttribute('aria-expanded', 'false');
    }
    
    toggle && toggle.addEventListener('click', function() {
        if (body.classList.contains('sidebar-open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
    
    closeBtn && closeBtn.addEventListener('click', closeSidebar);
    overlay && overlay.addEventListener('click', closeSidebar);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeSidebar();
    });
    
    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            alert('Logged out successfully!');
            window.location.href = 'index.html';
        });
    }
})();
