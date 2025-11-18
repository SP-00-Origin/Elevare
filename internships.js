(function () {
    // Minimal class: holds data only, easy to read/extend
    class Internship {
        constructor({ title, company, location, icon = '💼', description, tags = [], category = 'ALL', applyUrl = '#' }) {
            this.title = title;
            this.company = company;
            this.location = location;
            this.icon = icon;
            this.description = description;
            this.tags = Array.isArray(tags) ? tags : [];
            this.category = String(category).toUpperCase();
            this.applyUrl = applyUrl;
        }
    }

    // Render using an HTML <template> for less JS and consistent markup
    function renderCard(internship, template) {
        var clone = template.content.firstElementChild.cloneNode(true);
        clone.setAttribute('data-category', internship.category);

        var iconEl = clone.querySelector('[data-field="icon"]');
        var titleEl = clone.querySelector('[data-field="title"]');
        var companyEl = clone.querySelector('[data-field="company"]');
        var locationEl = clone.querySelector('[data-field="location"]');
        var descEl = clone.querySelector('[data-field="description"]');
        var tagsEl = clone.querySelector('[data-field="tags"]');
        var applyEl = clone.querySelector('[data-field="apply"]');

        if (iconEl) iconEl.textContent = internship.icon;
        if (titleEl) titleEl.textContent = internship.title;
        if (companyEl) companyEl.textContent = internship.company;
        if (locationEl) locationEl.textContent = internship.location;
        if (descEl) descEl.textContent = internship.description;
        if (applyEl) {
            applyEl.href = '#';
            applyEl.setAttribute('data-internship-id', internship.title.toLowerCase().replace(/\s+/g, '-'));
            applyEl.setAttribute('data-internship-title', internship.title);
            applyEl.setAttribute('data-internship-company', internship.company);
            applyEl.addEventListener('click', function(e) {
                e.preventDefault();
                openApplicationModal(internship);
            });
        }
        if (tagsEl) {
            tagsEl.innerHTML = '';
            internship.tags.forEach(function (t) {
                var span = document.createElement('span');
                span.className = 'tag';
                span.textContent = t;
                tagsEl.appendChild(span);
            });
        }

        return clone;
    }

    var listEl = document.querySelector('.internship-list');
    var template = document.getElementById('internship-card-template');
    var searchInput = document.getElementById('internshipSearch');
    var allInternships = [];
    
    if (!listEl || !template) return;

    // Hardcoded internships data (in a real app, this would come from an API)
    var internships = [
        new Internship({
            title: 'Frontend Developer Intern',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            icon: '🚀',
            description: 'Join our frontend team to build amazing user interfaces using React, TypeScript, and modern web technologies.',
            tags: ['React', 'TypeScript', 'CSS'],
            category: 'TECHNOLOGY',
            applyUrl: '#'
        }),
        new Internship({
            title: 'Marketing Analytics Intern',
            company: 'DataDriven Solutions',
            location: 'New York, NY',
            icon: '📊',
            description: 'Help analyze marketing campaigns and create data-driven insights to optimize marketing strategies.',
            tags: ['Analytics', 'SQL', 'Marketing'],
            category: 'MARKETING',
            applyUrl: '#'
        }),
        new Internship({
            title: 'UI/UX Design Intern',
            company: 'Creative Studio',
            location: 'Austin, TX',
            icon: '🎨',
            description: 'Create beautiful and intuitive user experiences for web and mobile applications.',
            tags: ['Figma', 'Adobe Creative', 'Prototyping'],
            category: 'DESIGN',
            applyUrl: '#'
        }),
        new Internship({
            title: 'Business Analyst Intern',
            company: 'Insight Partners',
            location: 'Remote',
            icon: '📈',
            description: 'Work with stakeholders to document requirements and improve operational processes.',
            tags: ['Excel', 'Communication', 'Problem Solving'],
            category: 'BUSINESS',
            applyUrl: '#'
        }),
        new Internship({
            title: 'Backend Developer Intern',
            company: 'CloudTech Systems',
            location: 'Seattle, WA',
            icon: '⚙️',
            description: 'Build scalable APIs and microservices using Node.js, Python, and cloud technologies.',
            tags: ['Node.js', 'Python', 'AWS'],
            category: 'TECHNOLOGY',
            applyUrl: '#'
        }),
        new Internship({
            title: 'Social Media Marketing Intern',
            company: 'BrandBoost Agency',
            location: 'Los Angeles, CA',
            icon: '📱',
            description: 'Manage social media campaigns and create engaging content for various platforms.',
            tags: ['Content Creation', 'Social Media', 'Canva'],
            category: 'MARKETING',
            applyUrl: '#'
        })
    ];

    allInternships = internships;

    // Function to render internships
    function renderInternships(internshipsToRender) {
        listEl.innerHTML = '';
        
        if (internshipsToRender.length === 0) {
            listEl.innerHTML = '<p style="text-align:center;padding:40px;color:#6c757d;">No internships found matching your search.</p>';
            return;
        }
        
        var frag = document.createDocumentFragment();
        internshipsToRender.forEach(function (i) { 
            frag.appendChild(renderCard(i, template)); 
        });
        listEl.appendChild(frag);
    }

    // Initial render
    renderInternships(allInternships);

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            var query = e.target.value.toLowerCase().trim();
            
            if (query === '') {
                renderInternships(allInternships);
                return;
            }
            
            var filtered = allInternships.filter(function(internship) {
                return (internship.title && internship.title.toLowerCase().includes(query)) ||
                       (internship.company && internship.company.toLowerCase().includes(query)) ||
                       (internship.location && internship.location.toLowerCase().includes(query)) ||
                       (internship.description && internship.description.toLowerCase().includes(query));
            });
            
            renderInternships(filtered);
        });
    }

    // Filter tabs functionality
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.filter-tab'));
    function setActive(tab) { 
        tabs.forEach(function (t) { t.classList.toggle('active', t === tab); }); 
    }
    
    function applyFilter(category) {
        var selected = String(category).toUpperCase();
        var filtered = selected === 'ALL' 
            ? allInternships 
            : allInternships.filter(function(i) { 
                return i.category === selected; 
            });
        renderInternships(filtered);
    }
    
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            setActive(tab);
            applyFilter(tab.textContent.trim());
            // Clear search when changing tabs
            if (searchInput) searchInput.value = '';
        });
    });

    // Modal functionality
    var modal = document.getElementById('applicationModal');
    var closeBtn = document.querySelector('.close-modal');
    var cancelBtn = document.getElementById('cancelApplication');
    var applicationForm = document.getElementById('applicationForm');

    function openApplicationModal(internship) {
        var userId = localStorage.getItem('userId');
        
        if (!userId) {
            alert('Please sign in to apply for internships.');
            window.location.href = 'signin.html';
            return;
        }

        // Set internship details
        document.getElementById('internshipId').value = internship.title.toLowerCase().replace(/\s+/g, '-');
        document.getElementById('internshipTitle').value = internship.title;
        document.getElementById('internshipCompany').value = internship.company;

        // Auto-fill user data
        var userName = localStorage.getItem('userName');
        var userEmail = localStorage.getItem('userEmail');
        var userPhone = localStorage.getItem('userPhone');

        if (userName) document.getElementById('applicantName').value = userName;
        if (userEmail) document.getElementById('applicantEmail').value = userEmail;
        if (userPhone) document.getElementById('applicantPhone').value = userPhone;

        // If data not in localStorage, fetch from API
        if (!userName || !userEmail || !userPhone) {
            fetch('/api/users/' + userId)
                .then(function(res) { return res.json(); })
                .then(function(response) {
                    if (response.success && response.data && response.data.user) {
                        var user = response.data.user;
                        if (user.name) {
                            document.getElementById('applicantName').value = user.name;
                            localStorage.setItem('userName', user.name);
                        }
                        if (user.email) {
                            document.getElementById('applicantEmail').value = user.email;
                            localStorage.setItem('userEmail', user.email);
                        }
                        if (user.phone) {
                            document.getElementById('applicantPhone').value = user.phone;
                            localStorage.setItem('userPhone', user.phone);
                        }
                    }
                })
                .catch(function(err) {
                    console.error('Error fetching user data:', err);
                });
        }

        modal.style.display = 'block';
    }

    function closeApplicationModal() {
        modal.style.display = 'none';
        applicationForm.reset();
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeApplicationModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeApplicationModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeApplicationModal();
        }
    });

    // Form submission
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var userId = localStorage.getItem('userId');
            console.log('User ID from localStorage:', userId);
            
            if (!userId) {
                alert('Please sign in to apply.');
                window.location.href = 'signin.html';
                return;
            }

            var formData = {
                internshipId: document.getElementById('internshipId').value,
                internshipTitle: document.getElementById('internshipTitle').value,
                internshipCompany: document.getElementById('internshipCompany').value,
                applicantName: document.getElementById('applicantName').value,
                applicantEmail: document.getElementById('applicantEmail').value,
                applicantPhone: document.getElementById('applicantPhone').value,
                coverLetter: document.getElementById('coverLetter').value,
                appliedDate: new Date().toISOString(),
                status: 'Pending'
            };

            console.log('Form data being sent:', formData);
            console.log('API URL:', '/api/users/' + userId + '/apply-internship');

            // Note: File upload would require FormData and multipart/form-data
            // For now, we'll just save the application data without the file
            
            fetch('/api/users/' + userId + '/apply-internship', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(function(res) {
                return res.json().then(function(data) {
                    if (!res.ok) {
                        throw new Error(data.message || 'Application failed');
                    }
                    return data;
                });
            })
            .then(function(response) {
                if (response.success) {
                    alert('Application submitted successfully! You can view your applications in your profile.');
                    closeApplicationModal();
                } else {
                    throw new Error(response.message || 'Application failed');
                }
            })
            .catch(function(err) {
                console.error('Error submitting application:', err);
                alert('Failed to submit application: ' + err.message);
            });
        });
    }
})();
