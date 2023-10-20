const generateUpdateSQLStorage = (updateData) => {
    let updateFields = [];

    if (updateData.hasOwnProperty('name')) {
        updateFields.push(`name = '${updateData.name}'`);
    }

    if (updateData.hasOwnProperty('description')) {
        updateFields.push(`description = '${updateData.description}'`);
    }

    if (updateData.hasOwnProperty('category')) {
        updateFields.push(`category = '${updateData.category}'`);
    }

    if (updateData.hasOwnProperty('qtd')) {
        updateFields.push(`qtd = '${updateData.qtd}'`);
    }

    if (updateFields.length > 0) {
        const updateQuery = `UPDATE storage SET ${updateFields.join(', ')} WHERE id = ?;`;
        return updateQuery;
    } else {
        return null; 
    }
}

module.exports = generateUpdateSQLStorage
