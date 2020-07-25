import React from 'react';

import AppContext from '../contexts/AppContext';
import Board from './Board';

export default ()  => (
	<AppContext>
		<Board />
	</AppContext>
)
