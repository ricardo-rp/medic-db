import { IconButton, TableCell, TableRow, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Edit, Check, X } from 'react-feather';
import api from 'src/utils/httpClient';

function SurgeryRow(props) {
  const { id, label } = props.surgery;
  const { fetchSurgeries } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);

  function handleCancel() {
    setNewLabel(label);
    setIsEditing(false);
    fetchSurgeries();
  }

  async function handleConfirm(value) {
    if (value === '') {
      alert('Insira um nome para a cirurgia.');
      return handleCancel();
    }

    try {
      await api.put(`/surgery/${id}`, { label: value });
      alert('Cirurgia criada.');
      fetchSurgeries();
    } catch (e) {
      alert('Erro ao criar cirurgia.');
      console.log('Erro ao criar cirurgia', e);
    }
    setIsEditing(false);
  }

  return (
    <TableRow hover key={id}>
      <TableCell>
        <TextField
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
          name="Cirurgia"
          variant="outlined"
          disabled={!isEditing}
        />
      </TableCell>
      <TableCell style={{ textAlign: 'center' }}>
        {isEditing ? (
          <>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleConfirm(newLabel)}
            >
              <Check />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleCancel()}
            >
              <X />
            </IconButton>
          </>
        ) : (
          <IconButton
            size="small"
            color="primary"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}

export default SurgeryRow;
