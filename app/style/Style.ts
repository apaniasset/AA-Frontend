import { PixelRatio, StyleSheet } from 'react-native';
import colors from '../utils/colors';
import Header from '../components/header/Index';

const BOLD = '700'
const pixel = PixelRatio.getFontScale()
const coefficient = 1.3

export const font_8 = (pixel > coefficient ? 7 : 8) * pixel
export const font_10 = (pixel > coefficient ? 9 : 10) * pixel
export const font_12 = (pixel > coefficient ? 10 : 12) * pixel
export const font_14 = (pixel > coefficient ? 12 : 14) * pixel
export const font_16 = (pixel > coefficient ? 14 : 16) * pixel
export const font_18 = (pixel > coefficient ? 15 : 18) * pixel
export const font_20 = (pixel > coefficient ? 16 : 20) * pixel
export const font_25 = (pixel > coefficient ? 22 : 25) * pixel
export const font_30 = (pixel > coefficient ? 25 : 30) * pixel

const CommonStyles = StyleSheet.create({
    width_100: {
        width: '100%'
    },
    width_50: {
        width: '49%'
    },
    width_20: {
        width: '20%'
    },
    width_40: {
        width: '40%'
    },
    width_60: {
        width: '59%'
    },
    width_80: {
        width: '79%'
    },
    flex_1: {
        flex: 1,
    },
    textCenter: {
        textAlign: 'center'
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.STATUSBAR
    },
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR
    },
    container_body: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flex: 1,
    },
    flex_row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flex_row_wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    // All Text
    heading_20_white: {
        fontWeight: BOLD,
        fontSize: font_20,
        color: colors.WHITE,
    },
    heading_12_white: {
        fontWeight: BOLD,
        fontSize: font_12,
        color: colors.WHITE,
    },
    heading_12_red: {
        fontWeight: BOLD,
        fontSize: font_12,
        color: colors.RED,
    },
    heading_12_green: {
        fontWeight: BOLD,
        fontSize: font_12,
        color: colors.GREEN,
    },
    heading_12_black: {
        fontWeight: BOLD,
        fontSize: font_12,
        color: colors.BLACK,
    },
    paragraph_20_white: {
        fontSize: font_20,
        color: colors.WHITE,
    },
    heading_20_black: {
        fontWeight: BOLD,
        fontSize: font_20,
        color: colors.BLACK,
    },
    heading_20_green: {
        fontWeight: BOLD,
        fontSize: font_20,
        color: colors.GREEN,
    },
    heading_18_green: {
        fontWeight: BOLD,
        fontSize: font_18,
        color: colors.GREEN,
    },
    heading_25_green: {
        fontWeight: BOLD,
        fontSize: font_25,
        color: colors.GREEN,
    },
    heading_25_gray: {
        fontWeight: BOLD,
        fontSize: font_25,
        color: colors.GRAY,
    },
    heading_25_black: {
        fontWeight: BOLD,
        fontSize: font_25,
        color: colors.BLACK,
    },
    heading_25_black_extra_bold: {
        fontWeight: 'bold',
        fontSize: font_25,
        color: colors.BLACK,
    },
    heading_20_red: {
        fontWeight: BOLD,
        fontSize: font_20,
        color: colors.RED,
    },
    heading_18_red: {
        fontWeight: BOLD,
        fontSize: font_18,
        color: colors.RED,
    },
    heading_20_orange: {
        fontWeight: BOLD,
        fontSize: font_20,
        color: colors.ORANGE,
    },
    heading_18_orange: {
        fontWeight: BOLD,
        fontSize: font_18,
        color: colors.ORANGE,
    },
    heading_18_dark_orange: {
        fontWeight: BOLD,
        fontSize: font_18,
        color: colors.DARK_ORANGE,
    },
    heading_20_gray: {
        fontWeight: BOLD,
        fontSize: font_20,
        color: colors.GRAY,
    },
    heading_18_white: {
        fontWeight: BOLD,
        fontSize: font_18,
        color: colors.WHITE,
    },
    heading_18_black: {
        fontWeight: BOLD,
        fontSize: font_18,
        color: colors.BLACK,
    },
    paragraph_18_black: {
        fontSize: font_18,
        color: colors.BLACK,
    },
    paragraph_16_blue: {
        fontSize: font_16,
        color: colors.LIGHT_BLUE,
    },
    paragraph_14_lightblue: {
        fontSize: font_14,
        color: colors.LIGHT_BLUE,
    },
    paragraph_14_dark_gray: {
        fontSize: font_14,
        color: colors.DARK_GREY,
    },
    heading_16_white: {
        fontWeight: BOLD,
        fontSize: font_16,
        color: colors.WHITE,
    },
    heading_16_gray: {
        fontWeight: BOLD,
        fontSize: font_16,
        color: colors.GRAY,
    },
    heading_18_gray: {
        fontWeight: BOLD,
        fontSize: font_18,
        color: colors.GRAY,
    },
    heading_16_black: {
        fontWeight: BOLD,
        fontSize: font_16,
        color: colors.BLACK,
    },
    heading_12_gray: {
        fontWeight: BOLD,
        fontSize: font_12,
        color: colors.GRAY,
    },
    paragraph_16_gray: {
        fontSize: font_16,
        color: colors.GRAY
    },
    paragraph_16_green: {
        fontSize: font_16,
        color: colors.GREEN
    },
    paragraph_20_black: {
        fontSize: font_20,
        color: colors.BLACK
    },
    paragraph_20_gray: {
        fontSize: font_20,
        color: colors.GRAY
    },
    heading_16_red: {
        fontWeight: BOLD,
        fontSize: font_16,
        color: colors.RED,
    },
    paragraph_16_red: {
        fontSize: font_16,
        color: colors.RED,
    },
    heading_16_green: {
        fontWeight: BOLD,
        fontSize: font_16,
        color: colors.GREEN,
    },
    heading_16_lightblue: {
        fontWeight: BOLD,
        fontSize: font_16,
        color: colors.MAIN_BLUE,
    },
    heading_16_blue: {
        fontWeight: BOLD,
        fontSize: font_16,
        color: colors.VERY_LIGHT_BLUE_LABLE,
    },
    heading_14_white: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.WHITE,
    },
    heading_14_orange: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.ORANGE,
    },
    heading_16_orange: {
        fontWeight: BOLD,
        fontSize: font_16,
        color: colors.ORANGE,
    },
    heading_16_yellow: {
        fontWeight: BOLD,
        fontSize: font_16,
        color: colors.YELLOW,
    },
    heading_14_black: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.BLACK,
    },
    heading_14_dark_black: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.DARK_BLACK,
    },
    heading_10_black: {
        fontWeight: BOLD,
        fontSize: font_10,
        color: colors.BLACK,
    },
    heading_10_green: {
        fontWeight: BOLD,
        fontSize: font_10,
        color: colors.GREEN,
    },
    heading_30_black: {
        fontWeight: BOLD,
        fontSize: font_30,
        color: colors.BLACK,
    },
    heading_14_red: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.RED,
    },
    heading_14_red_text: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.VERY_LIGHT_RED_TEXT,
    },
    heading_14_gray: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.GRAY,
    },
    heading_14_green: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.GREEN,
    },
    heading_14_blue: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.BLUE,
    },
    heading_14_main_blue: {
        fontWeight: BOLD,
        fontSize: font_14,
        color: colors.MAIN_BLUE,
    },
    heading_12_orange: {
        fontWeight: BOLD,
        fontSize: font_12,
        color: colors.ORANGE,
    },
    heading_10_orange: {
        fontWeight: BOLD,
        fontSize: font_10,
        color: colors.ORANGE,
    },
    heading_10_white: {
        fontWeight: BOLD,
        fontSize: font_10,
        color: '#FFF',
    },
    paragraph_10_red:{
        fontSize: font_10,
        color: colors.RED,
    },
    paragraph_10_purple: {
        fontSize: font_10,
        color: colors.PURPLE,
    },
    paragraph_16_black: {
        fontSize: font_16,
        color: colors.BLACK,
    },
    paragraph_16_white: {
        fontSize: font_16,
        color: colors.WHITE,
    },
    paragraph_14_black: {
        fontSize: font_14,
        color: colors.BLACK,
    },
    paragraph_14_orange: {
        fontSize: font_14,
        color: colors.ORANGE,
    },
    paragraph_14_blue: {
        fontSize: font_14,
        color: colors.BLUE,
    },
    paragraph_14_gray: {
        fontSize: font_14,
        color: colors.GRAY,
    },
    paragraph_14_white: {
        fontSize: font_14,
        color: colors.WHITE,
    },
    paragraph_14_green: {
        fontSize: font_14,
        color: colors.GREEN,
    },
    paragraph_12_black: {
        fontSize: font_12,
        color: colors.BLACK,
    },
    paragraph_12_white: {
        fontSize: font_12,
        color: colors.WHITE,
    },
    paragraph_12_blue: {
        fontSize: font_12,
        color: colors.BLUE,
    },
    paragraph_12_orange: {
        fontSize: font_12,
        color: colors.ORANGE,
    },
    paragraph_12_darkBlue: {
        fontSize: font_12,
        color: colors.DARK_BLUE,
    },
    paragraph_12_green: {
        fontSize: font_12,
        color: colors.GREEN,
    },
    paragraph_12_red: {
        fontSize: font_12,
        color: colors.RED,
    },
    paragraph_10_orange: {
        fontSize: font_10,
        color: colors.ORANGE,
    },
    paragraph_14_red: {
        fontSize: font_14,
        color: colors.RED,
    },
    paragraph_12_gray: {
        fontSize: font_12,
        color: colors.GRAY,
    },
    paragraph_12_dark_gray: {
        fontSize: font_12,
        color: colors.DARK_GREY,
    },
    paragraph_10_gray: {
        fontSize: font_10,
        color: colors.GRAY,
    },
    paragraph_10_black: {
        fontSize: font_10,
        color: colors.BLACK,
    },
    paragraph_10_grey: {
        fontSize: font_10,
        color: colors.DARK_GREY,
    },
    paragraph_14_grey: {
        fontSize: font_14,
        color: colors.DARK_GREY,
    },
    paragraph_16_grey: {
        fontSize: font_16,
        color: colors.DARK_GREY,
    },
    paragraph_10_white: {
        fontSize: font_10,
        color: colors.WHITE,
    },
    paragraph_8_white: {
        fontSize: font_8,
        color: colors.WHITE,
    },
    paragraph_8_gray: {
        fontSize: font_8,
        color: colors.GRAY,
    },
    paragraph_8_green: {
        fontSize: font_8,
        color: colors.GREEN,
    },
    paragraph_8_black: {
        fontSize: font_8,
        color: colors.BLACK,
    },
    paragraph_8_red: {
        fontSize: font_8,
        color: colors.RED,
    },
    paragraph_10_green: {
        fontSize: font_10,
        color: colors.GREEN,
    },
    input_box: {
        marginTop: 15, flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingHorizontal: 10, height: 50, backgroundColor: colors.INPUTBOX
    },
    text_input: {
        color: colors.TEXT_COLOR, fontSize: font_14,
        borderColor: colors.GRAY, borderWidth: 1, borderRadius: 6,
        minHeight: 30,
    },
    error: {
        color: colors.RED,
        fontSize: font_12,
    },
    center_modal: {
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    center_modal_body: {
        backgroundColor: colors.BG_WHITE,
        padding: 10,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        maxHeight: "90%"
    },
    modal_heading: {
        backgroundColor: colors.PRIMARY,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottom_modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    bottom_modal_body: {
        backgroundColor: colors.BG_WHITE,
        padding: 10,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        justifyContent: 'center',
    },
    bottom_card_line: {
        backgroundColor: colors.GRAY,
        borderRadius: 10,
        height: 5,
        width: 50,
        marginBottom: 20,
        alignSelf: 'center'
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: colors.SKY_BLUE,
        marginEnd: 10,
        alignSelf: 'center'
    },
    justify_content_space_between: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    justify_content_center: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row_centered: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    justify_content_space_evenly: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bottomSaveButton: {
        backgroundColor: colors.ORANGE,
        paddingVertical: 15
    },
    dropDown: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.GRAY,
        fontSize: 14,
        padding: 5,
        minHeight: 30,
        width: '100%'
    },
    placeholderStyle: {
        color: colors.GRAY
    },
    inputStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.PRIMARY,
        paddingStart: 10,
        height: 42,
        color: colors.BLACK
    },
    dateInputStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.GRAY,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
    },
    dropDown2: {
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
        fontSize: 14,
        padding: 10,
        paddingLeft: -5,
        minHeight: 42,
        width: '100%'
    },
    placeholderStyle2: {
        color: colors.LIGHT_GRAY
    },
    inputStyle2: {
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
        paddingStart: -5,
        height: 42,
        color: colors.BLACK
    },
    passInput: {
        height: 45,
        color: colors.BLACK,
        width: "90%"
    },
    dateInputStyle2: {
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingStart: -5,
        marginBottom: 10,
    },
    newContainer: {
        padding: 10,
        backgroundColor: colors.LIGHT_GRAY
    },
    errorMessage: {
        borderBottomWidth: 1,
        borderBottomColor: colors.RED,
    },
    headerJustify :{
        marginBottom: 15,
        backgroundColor: colors.VERY_LIGHT_GRAY,
        paddingRight: 20
    },
    helpIconStyle:{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10
    }
});
export default CommonStyles;
