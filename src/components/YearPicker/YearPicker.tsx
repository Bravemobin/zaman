import React, { useMemo } from 'react'
import CalendarItem from '../CalendarItem'
import { Wrapper } from './YearPicker.styled'
import { getYears } from '../../utils/dateHelper/dateHelper'
import formatDate from '../../utils/format'
import type { YearPickerProps } from './YearPicker.types'
import { localizeNumber } from '../../utils'

export const YearPicker = (props: YearPickerProps) => {
  const currentYear = parseInt(formatDate(props.value, 'YYYY', 'latn'), 10)
  const years: number[] = useMemo(() => getYears(props.value), [])

  const wrapperRef = React.useCallback((wrapper: HTMLDivElement) => {
    if (wrapper === null) {
      return
    }
    const qu = wrapper.querySelector('button[data-selected=true]')
    if (qu != null) {
      const { height: wrapperHeight } = wrapper.getBoundingClientRect()
      const { top } = qu.getBoundingClientRect()
      wrapper.scrollTop = top - wrapperHeight
    }
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
      {years.map((year) => (
        <CalendarItem
          key={year}
          width={90}
          height={59}
          data-selected={currentYear === year}
          onClick={() => props.onYearSelect(year)}
        >
          {localizeNumber(year)}
        </CalendarItem>
      ))}
    </Wrapper>
  )
}

export default YearPicker
