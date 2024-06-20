import { useValue } from 'react-cosmos/client';
import Example from '../src/components/example';

export default () => {
  const [loader] = useValue('loader', {
    defaultValue: <p>Some changed loader</p>,
  });

  const [error] = useValue('error', {
    defaultValue: '',
  });

  return <Example />;
};
