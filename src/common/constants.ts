export enum View {
  'Year',
  'Month',
  'Decade'
}

export const sortedViews = [View.Decade, View.Year, View.Month];

export const tileClassName = 'react-mini-calendar-tile'; // 用于提取day、month、decade等按钮的公共样式
