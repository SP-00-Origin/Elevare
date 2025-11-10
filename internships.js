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
        if (applyEl) applyEl.href = internship.applyUrl || '#';
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
    if (!listEl || !template) return;

    // Simple data: create instances with an object literal
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
            title: 'Business Analyst Intern',
            company: 'Insight Partners',
            location: 'Remote',
            icon: '📈',
            description: 'Work with stakeholders to document requirements and improve operational processes.',
            tags: ['Excel', 'Communication', 'Problem Solving'],
            category: 'BUSINESS',
            applyUrl: '#'
        })
    ];

    // Fill list
    listEl.innerHTML = '';
    var frag = document.createDocumentFragment();
    internships.forEach(function (i) { frag.appendChild(renderCard(i, template)); });
    listEl.appendChild(frag);

    // // Simple filter using existing tabs
    // var tabs = Array.prototype.slice.call(document.querySelectorAll('.filter-tab'));
    // function setActive(tab) { tabs.forEach(function (t) { t.classList.toggle('active', t === tab); }); }
    // // function applyFilter(category) {
    // //     var items = listEl.querySelectorAll('.internship-item');
    // //     var selected = String(category).toUpperCase();
    // //     items.forEach(function (el) {
    // //         var cat = (el.getAttribute('data-category') || 'ALL').toUpperCase();
    // //         el.style.display = (selected === 'ALL' || selected === cat) ? '' : 'none';
    // //     });
    // // }
    // tabs.forEach(function (tab) {
    //     tab.addEventListener('click', function () {
    //         setActive(tab);
    //         applyFilter(tab.textContent.trim());
    //     });
    // });
})();
