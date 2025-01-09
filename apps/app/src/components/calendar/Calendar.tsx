import type { DateData } from "react-native-calendars";
import type { Theme } from "@/types/theme";

import { CalendarArrow } from "@/components/calendar/CalendarArrow";
import { Calendar as RNCalendar } from "react-native-calendars";
import { StyleSheet } from "react-native";
import { getDateString } from "@/utils/dates";
import { useTheme } from "@/hooks/useTheme";

interface CalendarProps {
    markedDates: Record<string, Record<string, any>>;
    maxDate?: Date;
    minDate?: Date;
    onDayPress?: (date: DateData) => void;
}

export function Calendar({ markedDates, maxDate, minDate, onDayPress }: CalendarProps) {
    const theme = useTheme();
    const calendarTheme = useCalendarTheme(theme);

    minDate ||= new Date();
    if (!maxDate) {
        maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
    }

    return (
        <RNCalendar
            maxDate={getDateString(maxDate)}
            minDate={getDateString(minDate)}
            renderArrow={(direction: "left" | "right") => {
                return <CalendarArrow direction={direction} color={theme.colors.textSecondary} />;
            }}
            markedDates={markedDates}
            markingType="period"
            onDayPress={onDayPress}
            theme={calendarTheme}
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10
    }
});

const useCalendarTheme = (theme: Theme) => ({
    dayTextColor: theme.colors.textSecondary,
    monthTextColor: theme.colors.textPrimary,
    textDayFontFamily: theme.fonts.textBody.fontFamily,
    textDayHeaderFontFamily: theme.fonts.textBody.fontFamily,
    textDisabledColor: theme.colors.border,
    textMonthFontFamily: theme.fonts.headingMedium.fontFamily,
    textMonthFontSize: 20,
    textSectionTitleColor: theme.colors.textSecondary,
    "stylesheet.calendar.header": {
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 7,
            backgroundColor: theme.colors.background,
            borderRadius: 10,
            marginBottom: 12,
            margin: 5
        }
    },
    "stylesheet.calendar.main": {
        container: {
            backgroundColor: theme.colors.card,
            padding: 19
        }
    },
    "stylesheet.calendar.period": {
        wrapper: {
            alignItems: "center",
            alignSelf: "stretch",
            marginLeft: -2,
            borderRadius: 2,
            overflow: "hidden"
        },
        leftFiller: {
            height: 26,
            flex: 1,
            marginLeft: 50
        }
    }
});
