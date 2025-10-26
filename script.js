
        // Data: Degrees and Colleges
        const degreesData = {
            mca: [
    { name: 'RVCE Bangalore', rank: 1, location: 'Bangalore', fees: '₹1,20,000', desc: 'Research-oriented.', cutoff: 700 },
    { name: 'MSRIT Bangalore', rank: 2, location: 'Bangalore', fees: '₹1,00,000', desc: 'Autonomous institute.', cutoff: 600 },
    { name: 'UVCE Bangalore', rank: 3, location: 'Bangalore', fees: '₹50,000', desc: 'Govt engineering college.', cutoff: 500 },
    { name: 'PES University', rank: 4, location: 'Bangalore', fees: '₹2,00,000', desc: 'Private university excellence.', cutoff: 800 },
    { name: 'Dayananda Sagar', rank: 5, location: 'Bangalore', fees: '₹1,50,000', desc: 'Diverse courses.', cutoff: 900 },
    { name: 'BMSCE Bangalore', rank: 6, location: 'Bangalore', fees: '₹1,80,000', desc: 'Autonomous and accredited.', cutoff: 1000 },
    { name: 'NITTE Meenakshi', rank: 7, location: 'Bangalore', fees: '₹1,60,000', desc: 'Women-focused options.', cutoff: 1100 },
    { name: 'Sir MVIT', rank: 8, location: 'Bangalore', fees: '₹1,40,000', desc: 'Tech and management.', cutoff: 1200 }
],

mba: [
    { name: 'Christ University', rank: 1, location: 'Bangalore', fees: '₹12,00,000', desc: 'Top private business programs.', cutoff: 700 },
    { name: 'XIME Bangalore', rank: 2, location: 'Bangalore', fees: '₹10,00,000', desc: 'Management with global exposure.', cutoff: 800 },
    { name: 'IFIM Bangalore', rank: 3, location: 'Bangalore', fees: '₹9,50,000', desc: 'Industry-linked MBA programs.', cutoff: 850 }
],

mtech: [
    { name: 'RVCE Bangalore', rank: 1, location: 'Bangalore', fees: '₹1,20,000', desc: 'Research-oriented tech programs.', cutoff: 700 },
    { name: 'MSRIT Bangalore', rank: 2, location: 'Bangalore', fees: '₹1,00,000', desc: 'Autonomous institute.', cutoff: 600 },
    { name: 'UVCE Bangalore', rank: 3, location: 'Bangalore', fees: '₹50,000', desc: 'Govt engineering college.', cutoff: 500 },
    { name: 'PES University', rank: 4, location: 'Bangalore', fees: '₹2,00,000', desc: 'Private university excellence.', cutoff: 800 },
    { name: 'Dayananda Sagar', rank: 5, location: 'Bangalore', fees: '₹1,50,000', desc: 'Diverse courses.', cutoff: 900 }
],

pgcet: [
    { name: 'UVCE Bangalore', rank: 1, location: 'Bangalore', fees: '₹50,000', desc: 'Govt engineering college.', cutoff: 500 },
    { name: 'MSRIT Bangalore', rank: 2, location: 'Bangalore', fees: '₹1,00,000', desc: 'Autonomous institute.', cutoff: 600 },
    { name: 'RVCE Bangalore', rank: 3, location: 'Bangalore', fees: '₹1,20,000', desc: 'Research-oriented.', cutoff: 700 },
    { name: 'PES University', rank: 4, location: 'Bangalore', fees: '₹2,00,000', desc: 'Private university excellence.', cutoff: 800 },
    { name: 'Dayananda Sagar', rank: 5, location: 'Bangalore', fees: '₹1,50,000', desc: 'Diverse courses.', cutoff: 900 },
    { name: 'BMSCE Bangalore', rank: 6, location: 'Bangalore', fees: '₹1,80,000', desc: 'Autonomous and accredited.', cutoff: 1000 },
    { name: 'NITTE Meenakshi', rank: 7, location: 'Bangalore', fees: '₹1,60,000', desc: 'Women-focused options.', cutoff: 1100 },
    { name: 'Sir MVIT', rank: 8, location: 'Bangalore', fees: '₹1,40,000', desc: 'Tech and management.', cutoff: 1200 }
]

        };

        // DOM Elements
        const degreeCards = document.querySelectorAll('.degree-card');
        const collegesGrid = document.getElementById('collegesGrid');
        const rankFilter = document.getElementById('rankFilter');
        const contactForm = document.getElementById('contactForm');

        let currentDegree = null;
        let currentColleges = [];

        // Degree Selection
        degreeCards.forEach(card => {
            card.addEventListener('click', () => {
                const degree = card.dataset.degree;
                currentDegree = degree;
                currentColleges = degreesData[degree] || [];
                renderColleges();
                // Scroll to colleges
                document.getElementById('colleges').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Render Colleges
        function renderColleges() {
            if (!currentColleges.length) {
                collegesGrid.innerHTML = '<div class="no-colleges">Select a degree to view colleges.</div>';
                return;
            }
            collegesGrid.innerHTML = currentColleges.map(college => `
                <div class="college-card" data-cutoff="${college.cutoff}">
                    <h3>${college.name}</h3>
                    <div class="college-meta">
                        <span>Rank: ${college.rank}</span>
                        <span>${college.location}</span>
                    </div>
                    <div class="college-meta">
                        <span>Fees: ${college.fees}</span>
                    </div>
                    <p class="college-desc">${college.desc}</p>
                </div>
            `).join('');
            // Animate new cards
            setTimeout(() => {
                document.querySelectorAll('.college-card').forEach((card, index) => {
                    card.style.transitionDelay = `${index * 0.1}s`;
                    card.classList.add('animate');
                });
            }, 100);
            // Re-attach filter listener
            attachFilterListener();
        }

        // Rank Filter
        function attachFilterListener() {
            rankFilter.addEventListener('input', (e) => {
                const userRank = parseInt(e.target.value) || 99999;
                document.querySelectorAll('.college-card').forEach(card => {
                    const cutoff = parseInt(card.dataset.cutoff);
                    if (userRank <= cutoff) {
                        card.classList.add('highlight');
                    } else {
                        card.classList.remove('highlight');
                    }
                });
            });
        }

        // Form Validation
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let valid = true;
            // Reset errors
            document.querySelectorAll('.error').forEach(el => el.textContent = '');

            if (!name) {
                document.getElementById('nameError').textContent = 'Name is required.';
                valid = false;
            }
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                document.getElementById('emailError').textContent = 'Valid email is required.';
                valid = false;
            }
            if (!message) {
                document.getElementById('messageError').textContent = 'Message is required.';
                valid = false;
            }

            if (valid) {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
            }
        });

        // Smooth Scroll for Nav Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll', 'visible');
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('h2, .degree-card').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });

        // Initial degree cards animation
        setTimeout(() => {
            degreeCards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 0.1}s`;
                card.classList.add('animate');
            });
        }, 100);

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
   