/* ========================================
   Publications Page JavaScript
   ======================================== */

// Update stats
function updateStats() {
    const publications = document.querySelectorAll('.publication-card');
    document.getElementById('total-publications').textContent = publications.length;
    // Update citations and h-index from your actual data
    document.getElementById('total-citations').textContent = '0';
    document.getElementById('h-index').textContent = '0';
}

// Filter publications
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const filter = this.dataset.filter;
        
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const publications = document.querySelectorAll('.publication-card');
        let visibleCount = 0;

        publications.forEach(pub => {
            if (filter === 'all' || pub.dataset.type === filter) {
                pub.style.display = 'block';
                visibleCount++;
            } else {
                pub.style.display = 'none';
            }
        });

        document.getElementById('empty-state').style.display = visibleCount === 0 ? 'block' : 'none';
    });
});

// Toggle abstract
function toggleAbstract(btn) {
    const card = btn.closest('.publication-card');
    const abstract = card.querySelector('.abstract');
    abstract.classList.toggle('show');
    
    if (abstract.classList.contains('show')) {
        btn.innerHTML = '<i class="fas fa-times"></i> Hide Abstract';
    } else {
        btn.innerHTML = '<i class="fas fa-align-left"></i> Abstract';
    }
}

// Citation modal
function showCitation(btn) {
    const card = btn.closest('.publication-card');
    const title = card.querySelector('h3').textContent;
    const authors = card.querySelector('.authors').textContent;
    const venue = card.querySelector('.venue').textContent;
    const year = card.querySelector('.pub-year').textContent;

    // Generate BibTeX
    const bibtex = `@article{tilewale${year},
    title = {${title}},
    author = {${authors}},
    journal = {${venue}},
    year = {${year}}
}`;

    document.getElementById('citation-text').textContent = bibtex;
    document.getElementById('citation-modal').classList.add('show');

    // Store citation data for format switching
    window.currentCitation = { title, authors, venue, year };
}

function closeCitation() {
    document.getElementById('citation-modal').classList.remove('show');
}

// Citation format tabs
document.querySelectorAll('.citation-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.citation-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const format = this.dataset.format;
        const { title, authors, venue, year } = window.currentCitation;

        let citation = '';
        if (format === 'bibtex') {
            citation = `@article{tilewale${year},
    title = {${title}},
    author = {${authors}},
    journal = {${venue}},
    year = {${year}}
}`;
        } else if (format === 'apa') {
            citation = `${authors} (${year}). ${title}. ${venue}.`;
        } else if (format === 'mla') {
            citation = `${authors}. "${title}." ${venue}, ${year}.`;
        }

        document.getElementById('citation-text').textContent = citation;
    });
});

function copyCitation() {
    const text = document.getElementById('citation-text').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy to Clipboard';
        }, 2000);
    });
}

// Close modal on outside click
document.getElementById('citation-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeCitation();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', updateStats);
