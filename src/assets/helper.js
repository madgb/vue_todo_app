export function renderLabel(labelIndex) {
    const index = Number(labelIndex);
    if (index === 1) {
        return "red-bg label";
    }
    if (index === 2) {
        return "yellow-bg label";
    }
    if (index === 3) {
        return "orange-bg label";
    }
    if (index === 4) {
        return "purple-bg label";
    }
    if (index === 5) {
        return "blue-bg label";
    }
}

export const renderDate = rawDate => `${rawDate.getFullYear()}-${rawDate.getMonth() + 1}-${rawDate.getDate()}`;

export const renderDueDate = date => date >= new Date();

export const renderParseDate = tasksArr => {
    tasksArr.forEach(task => task.dueDate && (task.dueDate = new Date(task.dueDate)));
    return tasksArr;
};

export const renderValidationErrors = valObj => {
    const valKeys = Object.keys(valObj);
    const valVals = Object.values(valObj);
    const resultArr = [];
    for (let i = 0; i < valVals.length; i++) {
        resultArr.push({
            errorCheck: valVals[i],
            name: `${valKeys[i]}Error`
        });
    }
    return resultArr;
};

export const validationChecker = valObj => {
    let result = true;
    Object.values(valObj).forEach(eachVal => !eachVal && (result = false));
    return result;
};
