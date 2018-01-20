/**
 * External dependencies
 */
import { connect } from 'react-redux';
import {
	filter,
	get,
	map,
} from 'lodash';
/**
 * Internal dependencies
 */
import './style.scss';
import BlockListLayout from './layout';
import { getBlocks } from '../../store/selectors';

function BlockList( {
	blocks,
	renderBlockMenu,
	layouts = {},
	rootUID,
	showContextualToolbar,
} ) {
	const isGroupedByLayout = Array.isArray( layouts );
	if ( ! isGroupedByLayout ) {
		layouts = [ { name: 'default' } ];
	}

	return map( layouts, ( layout ) => {
		const layoutBlocks = isGroupedByLayout ?
			filter( blocks, ( block ) => (
				get( block, [ 'attributes', 'layout' ] ) === layout.name
			) ) :
			blocks;

		return (
			<BlockListLayout
				key={ layout.name }
				layout={ layout.name }
				isGroupedByLayout={ isGroupedByLayout }
				blocks={ layoutBlocks }
				renderBlockMenu={ renderBlockMenu }
				rootUID={ rootUID }
				showContextualToolbar={ showContextualToolbar }
			/>
		);
	} );
}

export default connect(
	( state, ownProps ) => ( {
		blocks: getBlocks( state, ownProps.rootUID ),
	} ),
)( BlockList );
