/**
 * JavaScript functions to read and parse CSV publication data
 * Converts CSV data to dictionary/object structures for easy manipulation
 */

/**
 * Reads CSV file and converts to array of publication objects
 * @param {string} csvContent - The CSV file content as string
 * @returns {Array} Array of publication objects
 */
function parsePublicationsCSV(csvContent) {
    const lines = csvContent.trim().split('\n');
    
    // Skip header row and process data
    const publications = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const columns = line.split('|');
            
            if (columns.length >= 4) {
                const publication = {
                    type: columns[0].trim(),
                    author: columns[1].trim(),
                    year: parseInt(columns[2].trim()) || 0,
                    title: columns[3].trim()
                };
                
                publications.push(publication);
            }
        }
    }
    
    return publications;
}

/**
 * Converts publications array to dictionary grouped by author
 * @param {Array} publications - Array of publication objects
 * @returns {Object} Dictionary with authors as keys
 */
function groupByAuthor(publications) {
    const authorDict = {};
    
    publications.forEach(pub => {
        if (!authorDict[pub.author]) {
            authorDict[pub.author] = {
                name: pub.author,
                publications: [],
                totalPublications: 0,
                publicationsByType: {},
                publicationsByYear: {},
                yearsActive: new Set()
            };
        }
        
        // Add publication to author
        authorDict[pub.author].publications.push(pub);
        authorDict[pub.author].totalPublications++;
        
        // Count by type
        if (!authorDict[pub.author].publicationsByType[pub.type]) {
            authorDict[pub.author].publicationsByType[pub.type] = 0;
        }
        authorDict[pub.author].publicationsByType[pub.type]++;
        
        // Count by year
        if (!authorDict[pub.author].publicationsByYear[pub.year]) {
            authorDict[pub.author].publicationsByYear[pub.year] = 0;
        }
        authorDict[pub.author].publicationsByYear[pub.year]++;
        
        // Track years active
        authorDict[pub.author].yearsActive.add(pub.year);
    });
    
    // Convert Set to Array for yearsActive
    Object.keys(authorDict).forEach(author => {
        authorDict[author].yearsActive = Array.from(authorDict[author].yearsActive).sort((a, b) => a - b);
    });
    
    return authorDict;
}

/**
 * Converts publications array to dictionary grouped by publication type
 * @param {Array} publications - Array of publication objects
 * @returns {Object} Dictionary with publication types as keys
 */
function groupByType(publications) {
    const typeDict = {};
    
    publications.forEach(pub => {
        if (!typeDict[pub.type]) {
            typeDict[pub.type] = {
                type: pub.type,
                publications: [],
                totalCount: 0,
                authors: new Set(),
                yearRange: { min: Infinity, max: -Infinity }
            };
        }
        
        typeDict[pub.type].publications.push(pub);
        typeDict[pub.type].totalCount++;
        typeDict[pub.type].authors.add(pub.author);
        
        // Track year range
        if (pub.year > 0) {
            typeDict[pub.type].yearRange.min = Math.min(typeDict[pub.type].yearRange.min, pub.year);
            typeDict[pub.type].yearRange.max = Math.max(typeDict[pub.type].yearRange.max, pub.year);
        }
    });
    
    // Convert Set to Array for authors and fix year ranges
    Object.keys(typeDict).forEach(type => {
        typeDict[type].authors = Array.from(typeDict[type].authors);
        if (typeDict[type].yearRange.min === Infinity) {
            typeDict[type].yearRange = { min: 0, max: 0 };
        }
    });
    
    return typeDict;
}

/**
 * Converts publications array to dictionary grouped by year
 * @param {Array} publications - Array of publication objects
 * @returns {Object} Dictionary with years as keys
 */
function groupByYear(publications) {
    const yearDict = {};
    
    publications.forEach(pub => {
        if (!yearDict[pub.year]) {
            yearDict[pub.year] = {
                year: pub.year,
                publications: [],
                totalCount: 0,
                authors: new Set(),
                publicationTypes: {}
            };
        }
        
        yearDict[pub.year].publications.push(pub);
        yearDict[pub.year].totalCount++;
        yearDict[pub.year].authors.add(pub.author);
        
        // Count by type
        if (!yearDict[pub.year].publicationTypes[pub.type]) {
            yearDict[pub.year].publicationTypes[pub.type] = 0;
        }
        yearDict[pub.year].publicationTypes[pub.type]++;
    });
    
    // Convert Set to Array for authors
    Object.keys(yearDict).forEach(year => {
        yearDict[year].authors = Array.from(yearDict[year].authors);
    });
    
    return yearDict;
}

/**
 * Gets publication statistics
 * @param {Array} publications - Array of publication objects
 * @returns {Object} Statistics object
 */
function getPublicationStats(publications) {
    const stats = {
        totalPublications: publications.length,
        uniqueAuthors: new Set(publications.map(p => p.author)).size,
        publicationTypes: {},
        yearRange: { min: Infinity, max: -Infinity },
        topAuthors: {},
        recentYears: {}
    };
    
    // Count by type
    publications.forEach(pub => {
        if (!stats.publicationTypes[pub.type]) {
            stats.publicationTypes[pub.type] = 0;
        }
        stats.publicationTypes[pub.type]++;
        
        // Track year range
        if (pub.year > 0) {
            stats.yearRange.min = Math.min(stats.yearRange.min, pub.year);
            stats.yearRange.max = Math.max(stats.yearRange.max, pub.year);
        }
        
        // Count by author
        if (!stats.topAuthors[pub.author]) {
            stats.topAuthors[pub.author] = 0;
        }
        stats.topAuthors[pub.author]++;
        
        // Count recent years (last 5 years)
        if (pub.year >= 2020) {
            if (!stats.recentYears[pub.year]) {
                stats.recentYears[pub.year] = 0;
            }
            stats.recentYears[pub.year]++;
        }
    });
    
    // Fix year range if no valid years
    if (stats.yearRange.min === Infinity) {
        stats.yearRange = { min: 0, max: 0 };
    }
    
    // Sort top authors
    stats.topAuthors = Object.entries(stats.topAuthors)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .reduce((obj, [author, count]) => {
            obj[author] = count;
            return obj;
        }, {});
    
    return stats;
}

/**
 * Reads CSV file from URL/path and returns parsed data
 * @param {string} filePath - Path to the CSV file
 * @returns {Promise} Promise that resolves to parsed data object
 */
async function loadPublicationsFromCSV(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvContent = await response.text();
        const publications = parsePublicationsCSV(csvContent);
        
        return {
            publications: publications,
            byAuthor: groupByAuthor(publications),
            byType: groupByType(publications),
            byYear: groupByYear(publications),
            statistics: getPublicationStats(publications)
        };
        
    } catch (error) {
        console.error('Error loading CSV file:', error);
        throw error;
    }
}

/**
 * Utility function to search publications
 * @param {Array} publications - Array of publication objects
 * @param {Object} criteria - Search criteria
 * @returns {Array} Filtered publications
 */
function searchPublications(publications, criteria = {}) {
    return publications.filter(pub => {
        let matches = true;
        
        if (criteria.author) {
            matches = matches && pub.author.toLowerCase().includes(criteria.author.toLowerCase());
        }
        
        if (criteria.type) {
            matches = matches && pub.type === criteria.type;
        }
        
        if (criteria.year) {
            matches = matches && pub.year === criteria.year;
        }
        
        if (criteria.title) {
            matches = matches && pub.title.toLowerCase().includes(criteria.title.toLowerCase());
        }
        
        if (criteria.yearRange) {
            matches = matches && pub.year >= criteria.yearRange.min && pub.year <= criteria.yearRange.max;
        }
        
        return matches;
    });
}

/**
 * Filters publications by author and title term combination
 * @param {Array} publications - Array of publication objects
 * @param {string} authorName - Author name to search for (case-insensitive partial match)
 * @param {string} titleTerm - Term to search for in titles (case-insensitive)
 * @param {Object} options - Additional filtering options
 * @param {boolean} options.exactAuthorMatch - Whether to match author name exactly (default: false)
 * @param {boolean} options.exactTitleMatch - Whether to match title term exactly (default: false)
 * @param {boolean} options.wholeWords - Whether to match whole words only in title (default: false)
 * @returns {Array} Filtered publications matching both author and title criteria
 */
function filterPublicationsByAuthorAndTitle(publications, authorName, titleTerm, options = {}) {
    if (!authorName && !titleTerm) {
        return publications;
    }
    
    const {
        exactAuthorMatch = false,
        exactTitleMatch = false,
        wholeWords = false
    } = options;
    
    return publications.filter(pub => {
        let authorMatches = true;
        let titleMatches = true;
        
        // Author matching
        if (authorName) {
            const normalizedAuthor = pub.author.toLowerCase();
            const normalizedSearchAuthor = authorName.toLowerCase().trim();
            
            if (exactAuthorMatch) {
                authorMatches = normalizedAuthor === normalizedSearchAuthor;
            } else {
                authorMatches = normalizedAuthor.includes(normalizedSearchAuthor);
            }
        }
        
        // Title matching
        if (titleTerm) {
            const title = pub.title.toLowerCase();
            const normalizedTitleTerm = titleTerm.toLowerCase().trim();
            
            if (exactTitleMatch) {
                titleMatches = title === normalizedTitleTerm;
            } else if (wholeWords) {
                // Use word boundary regex for whole word matching
                const regex = new RegExp(`\\b${normalizedTitleTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                titleMatches = regex.test(pub.title);
            } else {
                titleMatches = title.includes(normalizedTitleTerm);
            }
        }
        
        return authorMatches && titleMatches;
    });
}

/**
 * Advanced filter for multiple authors and title terms
 * @param {Array} publications - Array of publication objects
 * @param {Array} authorNames - Array of author names to search for
 * @param {Array} titleTerms - Array of terms to search for in titles
 * @param {Object} options - Filtering options
 * @param {string} options.authorLogic - 'AND' or 'OR' logic for authors (default: 'OR')
 * @param {string} options.titleLogic - 'AND' or 'OR' logic for title terms (default: 'OR')
 * @param {boolean} options.caseSensitive - Case sensitive search (default: false)
 * @returns {Array} Filtered publications
 */
function filterPublicationsByMultipleAuthorsAndTerms(publications, authorNames = [], titleTerms = [], options = {}) {
    const {
        authorLogic = 'OR',
        titleLogic = 'OR',
        caseSensitive = false
    } = options;
    
    if (authorNames.length === 0 && titleTerms.length === 0) {
        return publications;
    }
    
    return publications.filter(pub => {
        let authorMatches = true;
        let titleMatches = true;
        
        // Author matching
        if (authorNames.length > 0) {
            const author = caseSensitive ? pub.author : pub.author.toLowerCase();
            const normalizedAuthors = caseSensitive ? authorNames : authorNames.map(name => name.toLowerCase());
            
            if (authorLogic === 'AND') {
                authorMatches = normalizedAuthors.every(name => author.includes(name));
            } else {
                authorMatches = normalizedAuthors.some(name => author.includes(name));
            }
        }
        
        // Title matching
        if (titleTerms.length > 0) {
            const title = caseSensitive ? pub.title : pub.title.toLowerCase();
            const normalizedTerms = caseSensitive ? titleTerms : titleTerms.map(term => term.toLowerCase());
            
            if (titleLogic === 'AND') {
                titleMatches = normalizedTerms.every(term => title.includes(term));
            } else {
                titleMatches = normalizedTerms.some(term => title.includes(term));
            }
        }
        
        return authorMatches && titleMatches;
    });
}

/**
 * Gets publications for specific author with title filtering
 * @param {Array} publications - Array of publication objects
 * @param {string} authorName - Author name to search for
 * @param {string} titleFilter - Optional title filter term
 * @returns {Object} Author's publications with optional title filtering
 */
function getAuthorPublicationsWithTitleFilter(publications, authorName, titleFilter = '') {
    if (!authorName) {
        return { author: '', publications: [], filteredCount: 0, totalCount: 0 };
    }
    
    // Get all publications for the author
    const authorPubs = publications.filter(pub => 
        pub.author.toLowerCase().includes(authorName.toLowerCase())
    );
    
    // Apply title filter if provided
    const filteredPubs = titleFilter 
        ? authorPubs.filter(pub => 
            pub.title.toLowerCase().includes(titleFilter.toLowerCase())
          )
        : authorPubs;
    
    return {
        author: authorName,
        publications: filteredPubs,
        filteredCount: filteredPubs.length,
        totalCount: authorPubs.length,
        titleFilter: titleFilter || 'none'
    };
}

// Export functions for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parsePublicationsCSV,
        groupByAuthor,
        groupByType,
        groupByYear,
        getPublicationStats,
        loadPublicationsFromCSV,
        searchPublications,
        filterPublicationsByAuthorAndTitle,
        filterPublicationsByMultipleAuthorsAndTerms,
        getAuthorPublicationsWithTitleFilter
    };
}

// Make functions globally available for browser use
if (typeof window !== 'undefined') {
    window.PublicationsParser = {
        parsePublicationsCSV,
        groupByAuthor,
        groupByType,
        groupByYear,
        getPublicationStats,
        loadPublicationsFromCSV,
        searchPublications,
        filterPublicationsByAuthorAndTitle,
        filterPublicationsByMultipleAuthorsAndTerms,
        getAuthorPublicationsWithTitleFilter
    };
}

/* 
USAGE EXAMPLES:

// 1. Load and parse CSV file
loadPublicationsFromCSV('./publicacoesPorMembro_.csv')
    .then(data => {
        console.log('Total publications:', data.statistics.totalPublications);
        console.log('Top authors:', data.statistics.topAuthors);
        console.log('Publications by type:', data.statistics.publicationTypes);
    })
    .catch(error => console.error('Error:', error));

// 2. Parse CSV content directly
const csvContent = `Type|Author|Year|Title
artigoEmPeriodico|João Silva|2023|Inteligência Artificial na Educação
trabalhoCompletoEmCongresso|Maria Santos|2022|Sustentabilidade em Projetos`;

const publications = parsePublicationsCSV(csvContent);
const byAuthor = groupByAuthor(publications);
const stats = getPublicationStats(publications);

// 3. Basic search publications
const results = searchPublications(publications, {
    author: 'João',
    yearRange: { min: 2020, max: 2023 }
});

// 4. Access specific author data
const authorData = byAuthor['João Silva'];
console.log(`${authorData.name} has ${authorData.totalPublications} publications`);

// 5. Filter by author AND title term (new functions)
const aiPapersByJoao = filterPublicationsByAuthorAndTitle(publications, 'João', 'inteligência');
const educationPapersByMaria = filterPublicationsByAuthorAndTitle(publications, 'Maria', 'educação', {
    exactAuthorMatch: false,
    wholeWords: true
});

// 6. Advanced filter by multiple authors and title terms
const techPapers = filterPublicationsByMultipleAuthorsAndTerms(
    publications, 
    ['João Silva', 'Maria Santos'], 
    ['tecnologia', 'inovação'], 
    {
        authorLogic: 'OR',  // Any of the authors
        titleLogic: 'OR',   // Any of the title terms
        caseSensitive: false
    }
);

const aiEducationPapers = filterPublicationsByMultipleAuthorsAndTerms(
    publications, 
    ['João'], 
    ['inteligência', 'educação'], 
    {
        authorLogic: 'OR',
        titleLogic: 'AND'  // Must contain BOTH title terms
    }
);

// 7. Get specific author's publications with title filtering
const joaoAI = getAuthorPublicationsWithTitleFilter(publications, 'João Silva', 'inteligência');
console.log(`João has ${joaoAI.filteredCount} AI papers out of ${joaoAI.totalCount} total papers`);

// 8. Practical research analysis examples
const sustainabilityResearchers = filterPublicationsByAuthorAndTitle(publications, '', 'sustentabilidade');
const educationBySpecificAuthor = filterPublicationsByAuthorAndTitle(publications, 'Silva', 'educação');

// 9. Find collaborations on specific topics
const collaborativeAI = filterPublicationsByMultipleAuthorsAndTerms(
    publications,
    ['Silva', 'Santos', 'Costa'],
    ['inteligência artificial', 'machine learning'],
    { authorLogic: 'OR', titleLogic: 'OR' }
);

console.log(`Found ${collaborativeAI.length} AI-related papers from key researchers`);
*/
