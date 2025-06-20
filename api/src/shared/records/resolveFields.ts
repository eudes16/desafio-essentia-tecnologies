const resolveFields = (fields: any, options: any): void => {
    const selectfields: { [field: string]: boolean; } = {};

    if (fields?.length > 0) {
        fields.forEach((field: string) => {
            selectfields[field] = true;
        });
    }

    if (Object.keys(selectfields).length > 0) {
        options.select = { ...options.select, ...selectfields };
    }
};

export default resolveFields;