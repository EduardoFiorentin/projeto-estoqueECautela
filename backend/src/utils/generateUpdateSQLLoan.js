const generateUpdateSQLLoan = (updateData) => {
    let updateFields = [];

    if (updateData.hasOwnProperty('name')) {
        updateFields.push(`name = '${updateData.name}'`);
    }

    if (updateData.hasOwnProperty('description')) {
        updateFields.push(`description = '${updateData.description}'`);
    }

    if (updateData.hasOwnProperty('conditions')) {
        updateFields.push(`conditions = '${updateData.conditions}'`);
    }

    if (updateData.hasOwnProperty('provider')) {
        updateFields.push(`provider = '${updateData.provider}'`);
    }

    if (updateData.hasOwnProperty('receiver')) {
        updateFields.push(`receiver = '${updateData.receiver}'`);
    }

    if (updateData.hasOwnProperty('status')) {
        updateFields.push(`status = '${updateData.status}'`);
    }

    if (updateFields.length > 0) {
        const updateQuery = `UPDATE loan SET ${updateFields.join(', ')} WHERE id = ?;`;
        return updateQuery;
    } else {
        return null; 
    }
}

module.exports = generateUpdateSQLLoan
