export function renderLabel(labelIndex) {
    const index = Number(labelIndex);
    if(index === 1) {
        return 'red-bg label';
    }
    if(index === 2) {
        return 'yellow-bg label';
    }
    if(index === 3) {
        return 'orange-bg label';
    }
    if(index === 4) {
        return 'purple-bg label';
    }
    if(index === 5) {
        return 'blue-bg label';
    }
}

export const renderDate = rawDate => `${rawDate.getFullYear()}-${(rawDate.getMonth() + 1)}-${rawDate.getDate()}`;

export const renderDueDate = date => date >= new Date();