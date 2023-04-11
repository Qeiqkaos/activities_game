import { Provider } from 'react-redux';
import store from './redux/store/index.js';
import ActivityApp from './ActivityApp';

export default function App() {
  return (
    <Provider store={store}>
     <ActivityApp/>
    </Provider>
  );
}
