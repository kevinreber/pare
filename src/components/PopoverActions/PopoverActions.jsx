/** Dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';

/** Popover with basic CRUD actions
 *
 * @param {function}	remove		Remove action.
 * @param {function}	edit		Edit action.
 * @param {string}		id			ID to be used as reference.
 * @param {boolean}		open		Boolean status to show popover.
 * @param {object}		anchorEl	Object of where to display popover.
 * @param {function}	close		Closes popover.
 * @param {boolean}		deleteBtn	Boolean to show Delete Button.
 * @param {boolean}		editBtn		Boolean to show Edit Button.
 * @param {boolean}		block		Boolean to show Block Button.
 */
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
				) : null}
				{editBtn ? (
					<IconButton className="Edit__Btn" onClick={() => edit()}>
						<EditIcon />
					</IconButton>
				) : null}
			</Popover>
		</>
	);
}

PopoverActions.propTypes = {
	remove: PropTypes.func,
	edit: PropTypes.func,
	id: PropTypes.string,
	open: PropTypes.bool,
	anchorEl: PropTypes.object,
	close: PropTypes.func,
	deleteBtn: PropTypes.bool,
	editBtn: PropTypes.bool,
	block: PropTypes.bool,
};

export default PopoverActions;
