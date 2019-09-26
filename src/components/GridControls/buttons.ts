import withTippy, { TippyPropsLite } from '../common/withTippy';
import Button from './Button';

const options: TippyPropsLite = {
  placement: 'left',
};

export const SaveButton = withTippy(
  Button,
  'Save locally. Can be viewed in My Gallery',
  options,
);

export const PreviewButton = withTippy(Button, 'Hide grid.', options);

export const ClearButton = withTippy(
  Button,
  'Clear grid. Can be undone.',
  options,
);

export const ResetButton = withTippy(
  Button,
  'Resets editor to default state. Can not be undone.',
  options,
);
