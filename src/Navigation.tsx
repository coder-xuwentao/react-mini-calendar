import { View, RangeType, Action } from './common/types'

export type NavigationLabelArgs = {
  date: Date;
  label: string;
  locale: string | undefined;
  view: View;
};
export type NavigationLabelFunc = (NavigationLabelArgs) => React.ReactNode;

interface NavigationProps {
  activeStartDate: Date;
  drillUp: () => void;
  navigationLabel?: NavigationLabelFunc;
  next2Label?: React.ReactNode;
  nextLabel?: React.ReactNode;
  prev2Label?: React.ReactNode;
  prevLabel?: React.ReactNode;
  setActiveStartDate: (nextActiveStartDate: Date, action: Action) => void;
  view: RangeType;
  views: string[];
}

const Navigation = ({ activeStartDate,
  drillUp,
  navigationLabel,
  next2Label = '»',
  nextLabel = '›',
  prev2Label = '«',
  prevLabel = '‹',
  setActiveStartDate,
  view,
  views,
}: NavigationProps) => {

  return <div>123</div>
}

export default Navigation;