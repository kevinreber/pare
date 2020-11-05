import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './ProgressBar.css';

/** Progress Bar to display progress of upload.
 *
 * @param {number} progress Percentage of progress completion.
 */
function CircularProgressWithLabel({ progress }) {
	return (
		<div
			className={`Progress-Bar ${
				progress === 0 || progress === 100 ? 'd-none' : ''
			}`}>
			<Box position="relative" display="inline-flex">
				{/* <CircularProgress variant="static" {...props} /> */}
				<CircularProgress variant="static" />
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					justifyContent="center">
					<Typography
						variant="caption"
						component="div"
						color="textSecondary">{`${Math.round(progress)}%`}</Typography>
				</Box>
			</Box>
		</div>
	);
}
CircularProgressWithLabel.propTypes = {
	progress: PropTypes.number,
};

export default CircularProgressWithLabel;
