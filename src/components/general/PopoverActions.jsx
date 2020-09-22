/** Dependencies */
import React from 'react';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';

/** Popover with basic CRUD actions */
function PopoverActions({
	remove,
	edit,
	id,
	open,
	anchorEl,
	close,
	deleteBtn = true,
	editBtn = true,
	block = false,
}) {
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
				{deleteBtn ? (
					<IconButton className="Delete__Btn" onClick={() => remove()}>
						{block ? <BlockIcon /> : <DeleteIcon />}
					</IconButton>
				) : (
					''
				)}
				{editBtn ? (
					<IconButton className="Edit__Btn" onClick={() => edit()}>
						<EditIcon />
					</IconButton>
				) : (
					''
				)}
			</Popover>
		</>
	);
}

export default PopoverActions;
