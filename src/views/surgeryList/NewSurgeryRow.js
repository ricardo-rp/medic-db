import { IconButton, TableCell, TableRow, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Check, X, PlusCircle } from 'react-feather';
import api from 'src/utils/httpClient';

function NewSurgeryRow(props) {
  const { fetchSurgeries } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState('');

  function handleCancel() {
    setLabel('');
    setIsEditing(false);
    fetchSurgeries();
  }

  async function handleConfirm(value) {
    if (value === '') {
      alert('Insira um nome para a cirurgia.');
      return handleCancel();
    }

    try {
      await api.post('/surgery/', { label: value });
      alert('Cirurgia criada.');
      fetchSurgeries();
      setLabel('');
    } catch (e) {
      alert('Erro ao criar cirurgia.');
      console.log('Erro ao criar cirurgia', e);
    }
    setIsEditing(false);
  }

  return (
    <TableRow hover>
      <TableCell>
        <TextField
          value={label}
          label="Nova cirurgia"
          onChange={e => setLabel(e.target.value)}
          name="Cirurgia"
          variant="outlined"
          disabled={!isEditing}
          InputLabelProps={{ shrink: isEditing }}
        />
      </TableCell>
      <TableCell style={{ textAlign: 'center' }}>
        {isEditing ? (
          <>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleConfirm(label)}
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
            <PlusCircle />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}

export default NewSurgeryRow;
