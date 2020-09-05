import React from 'react';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/** Popover with basic CRUD actions */
function PopoverActions({ remove, edit, id, open, anchorEl, close }) {
	return (
		<>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={close}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}>
				<IconButton className='Delete__Btn' onClick={() => remove()}>
					<DeleteIcon />
				</IconButton>
				<IconButton className='Edit__Btn' onClick={() => edit()}>
					<EditIcon />
				</IconButton>
			</Popover>
		</>
	);
}

export default PopoverActions;
