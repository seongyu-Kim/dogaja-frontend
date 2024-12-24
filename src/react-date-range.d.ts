declare module 'react-date-range' {
  import { ReactNode } from 'react';

  export interface Range {
    startDate: Date | null;
    endDate: Date | null;
    key: string;
  }

  export interface DateRangeProps {
    ranges: Range[];
    onChange: (ranges: { selection: Range }) => void;
    editableDateInputs?: boolean;
    moveRangeOnFirstSelection?: boolean;
    showSelectionPreview?: boolean;
    months?: number;
    direction?: 'vertical' | 'horizontal';
    className?: string;
    rangeColors?: string[];
    staticRanges?: any[];
    inputRanges?: any[];
    renderStaticRangeLabel?: (staticRange: any) => ReactNode;
  }

  export class DateRange extends React.Component<DateRangeProps, any> {}
}
