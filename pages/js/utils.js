let sortDirection = {};

function sortTable(tableID, column, type = 'string') {
    const table = document.getElementById(tableID);
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    sortDirection[column] = !sortDirection[column];
    const ascending = sortDirection[column];

    rows.sort((a, b) => {
        const aVal = a.cells[column].textContent.trim();
        const bVal = b.cells[column].textContent.trim();

        if (type === 'number') {
            return ascending ? aVal - bVal : bVal - aVal;
        } else if (type === 'date') {
            return ascending ? new Date(aVal) - new Date(bVal) : new Date(bVal) - new Date(aVal);
        } else {
            return ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
    });

    rows.forEach(row => tbody.appendChild(row));
}