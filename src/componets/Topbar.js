import { Appbar } from 'react-native-paper';
import PropTypes from 'prop-types';

const Topbar = (props) => {
	const {
		title,
		hasBackAction = false,
		onBack
	} = props;

	return (
		<Appbar.Header style={{backgroundColor: '#38526c'}} elevated>
			{
				hasBackAction
					? <Appbar.BackAction onPress={onBack} />
					: null
			}
			<Appbar.Content title={title} color='#F5F7FA'/>
		</Appbar.Header>
	);
};

Topbar.propTypes = {
	title: PropTypes.string.isRequired,
	hasBackAction: PropTypes.bool,
	onBack: PropTypes.func
};

export default Topbar;