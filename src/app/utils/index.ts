export function isSingleField (field: Field): field is SingleField {
    return field.type === 'input';
}

export function isMultiField (field: Field): field is MultiField {
    return field.type === 'select' || field.type === 'checkbox' || field.type === 'radio';
}