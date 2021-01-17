/** Dependencies */
import React, { memo } from 'react';
import * as PropTypes from 'prop-types';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import LinkIcon from '@material-ui/icons/Link';

interface PopoverShareProps {
	id: string;
	open: boolean;
	anchorEl: any;
	close: any;
	shareLink: Function;
}

/** Popover with shareLink action */
function PopoverShareAction({
	id,
	open,
	anchorEl,
	close,
	shareLink,
}: PopoverShareProps): JSX.Element {
	return (
		<>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={close}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}>
				<IconButton className="Share__Btn" onClick={() => shareLink}>
					<LinkIcon />
					<small>share</small>
				</IconButton>
			</Popover>
		</>
	);
}

PopoverShareAction.propTypes = {
	id: PropTypes.string,
	open: PropTypes.bool,
	close: PropTypes.func,
	shareLink: PropTypes.func,
};

export default memo(PopoverShareAction);
