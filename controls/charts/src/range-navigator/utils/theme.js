define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeNavigatorTheme;
    (function (RangeNavigatorTheme) {
        RangeNavigatorTheme.axisLabelFont = {
            size: '12px',
            fontWeight: 'Normal',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        RangeNavigatorTheme.tooltipLabelFont = {
            size: '12px',
            fontWeight: 'Normal',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
    })(RangeNavigatorTheme = exports.RangeNavigatorTheme || (exports.RangeNavigatorTheme = {}));
    function getRangeThemeColor(theme, range) {
        var thumbSize = range.navigatorStyleSettings.thumb;
        var thumbWidth = ej2_base_1.isNullOrUndefined(thumbSize.width) ? (ej2_base_1.Browser.isDevice ? 15 : 20) : thumbSize.width;
        var thumbHeight = ej2_base_1.isNullOrUndefined(thumbSize.height) ? (ej2_base_1.Browser.isDevice ? 15 : 20) : thumbSize.height;
        var darkAxisColor = (theme === 'HighContrast') ? '#969696' : '#6F6C6C';
        var darkGridlineColor = (theme === 'HighContrast') ? '#4A4848' : '#414040';
        var darkBackground = theme === 'MaterialDark' ? '#383838' : (theme === 'FabricDark' ? '#242424' : '#1b1b1b');
        var style = {
            gridLineColor: '#E0E0E0',
            axisLineColor: '#000000',
            labelFontColor: '#686868',
            unselectedRectColor: range.series.length ? 'rgba(255, 255, 255, 0.6)' : '#EEEEEE',
            thumpLineColor: 'rgba(189, 189, 189, 1)',
            thumbBackground: 'rgba(250, 250, 250, 1)',
            gripColor: '#757575',
            background: '#FFFFFF',
            thumbHoverColor: '#EEEEEE',
            selectedRegionColor: range.series.length ? 'transparent' : '#FF4081',
            tooltipBackground: 'rgb(0, 8, 22)',
            tooltipFontColor: '#dbdbdb',
            thumbWidth: thumbWidth,
            thumbHeight: thumbHeight
        };
        switch (theme) {
            case 'Fabric':
                style.selectedRegionColor = range.series.length ? 'transparent' : '#007897';
                break;
            case 'Bootstrap':
                style.selectedRegionColor = range.series.length ? 'transparent' : '#428BCA';
                break;
            case 'HighContrastLight':
                style = {
                    gridLineColor: '#bdbdbd',
                    axisLineColor: '#969696',
                    labelFontColor: '#ffffff',
                    unselectedRectColor: range.series.length ? 'rgba(255, 255, 255, 0.3)' : '#EEEEEE',
                    thumpLineColor: '#ffffff',
                    thumbBackground: '#262626',
                    gripColor: '#ffffff',
                    background: darkBackground,
                    thumbHoverColor: '#BFBFBF',
                    selectedRegionColor: range.series.length ? 'transparent' : '#FFD939',
                    tooltipBackground: '#ffffff',
                    tooltipFontColor: '#000000',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            case 'Highcontrast':
            case 'HighContrast':
                style = {
                    gridLineColor: darkGridlineColor,
                    axisLineColor: darkAxisColor,
                    labelFontColor: '#DADADA',
                    unselectedRectColor: range.series.length ? 'rgba(43, 43, 43, 0.6)' : '#514F4F',
                    thumpLineColor: '#969696',
                    thumbBackground: '#333232',
                    gripColor: '#DADADA',
                    background: '#000000',
                    thumbHoverColor: '#BFBFBF',
                    selectedRegionColor: range.series.length ? 'rgba(22, 22, 22, 0.6)' : '#FFD939',
                    tooltipBackground: '#F4F4F4',
                    tooltipFontColor: '#282727',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            case 'MaterialDark':
            case 'FabricDark':
            case 'BootstrapDark':
                style = {
                    labelFontColor: '#DADADA',
                    axisLineColor: ' #6F6C6C',
                    gridLineColor: '#414040',
                    tooltipBackground: '#F4F4F4',
                    tooltipFontColor: '#333232',
                    unselectedRectColor: range.series.length ? 'rgba(43, 43, 43, 0.6)' : '#514F4F',
                    thumpLineColor: '#969696',
                    thumbBackground: '#333232',
                    gripColor: '#DADADA',
                    background: darkBackground,
                    thumbHoverColor: '#BFBFBF',
                    selectedRegionColor: range.series.length ? 'rgba(22, 22, 22, 0.6)' :
                        theme === 'FabricDark' ? '#007897' : theme === 'BootstrapDark' ? '#428BCA' : '#FF4081',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            case 'Bootstrap4':
                style = {
                    gridLineColor: '#E0E0E0',
                    axisLineColor: '#CED4DA',
                    labelFontColor: '#212529',
                    unselectedRectColor: range.series.length ? 'rgba(255, 255, 255, 0.6)' : '#514F4F',
                    thumpLineColor: 'rgba(189, 189, 189, 1)',
                    thumbBackground: '#FFFFFF',
                    gripColor: '#495057',
                    background: 'rgba(255, 255, 255, 0.6)',
                    thumbHoverColor: '#EEEEEE',
                    selectedRegionColor: range.series.length ? 'transparent' : '#FFD939',
                    tooltipBackground: 'rgba(0, 0, 0, 0.9)',
                    tooltipFontColor: 'rgba(255, 255, 255)',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            case 'Tailwind':
                style = {
                    gridLineColor: '#E5E7EB',
                    axisLineColor: '#D1D5DB',
                    labelFontColor: '#6B7280',
                    unselectedRectColor: range.series.length ? 'transparent' : '#E5E7EB',
                    thumpLineColor: '#9CA3AF',
                    thumbBackground: '#FFFFFF',
                    gripColor: '#6B7280',
                    background: 'rgba(255, 255, 255, 0.6)',
                    thumbHoverColor: '#374151',
                    selectedRegionColor: range.series.length ? 'rgba(79, 70, 229, 0.3)' : '#4F46E5',
                    tooltipBackground: '#111827',
                    tooltipFontColor: '#F9FAFB',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            case 'TailwindDark':
                style = {
                    gridLineColor: '#374151',
                    axisLineColor: '#4B5563',
                    labelFontColor: '#9CA3AF',
                    unselectedRectColor: range.series.length ? 'transparent' : '#4B5563',
                    thumpLineColor: '#6B7280',
                    thumbBackground: '#1F2937',
                    gripColor: '#D1D5DB',
                    background: '#1f2937',
                    thumbHoverColor: '#E5E7EB',
                    selectedRegionColor: range.series.length ? 'rgba(255, 255, 255, 0.6)' : '#22D3EE',
                    tooltipBackground: '#F9FAFB',
                    tooltipFontColor: '#1F2937',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            case 'Bootstrap5':
                style = {
                    gridLineColor: '#E5E7EB',
                    axisLineColor: '#E5E7EB',
                    labelFontColor: '#495057',
                    unselectedRectColor: range.series.length ? 'transparent' : '#E5E7EB',
                    thumpLineColor: '#9CA3AF',
                    thumbBackground: '#FFFFFF',
                    gripColor: '#6C757D',
                    background: 'rgba(255, 255, 255, 0.0)',
                    thumbHoverColor: '#374151',
                    selectedRegionColor: range.series.length ? 'rgba(31, 41, 55, 0.1)' : '#4F46E5',
                    tooltipBackground: '#212529',
                    tooltipFontColor: '#F9FAFB',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            case 'Bootstrap5Dark':
                style = {
                    gridLineColor: '#343A40',
                    axisLineColor: '#343A40',
                    labelFontColor: '#CED4DA',
                    unselectedRectColor: range.series.length ? 'transparent' : '#E5E7EB',
                    thumpLineColor: '#6C757D',
                    thumbBackground: '#ADB5BD',
                    gripColor: '#ADB5BD',
                    background: '#212529',
                    thumbHoverColor: '#374151',
                    selectedRegionColor: range.series.length ? 'rgba(173, 181, 189, 0.1)' : '#ADB5BD',
                    tooltipBackground: '#E9ECEF',
                    tooltipFontColor: '#212529',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            case 'Fluent':
                style = {
                    gridLineColor: '#EDEBE9',
                    axisLineColor: '#D2D0CE',
                    labelFontColor: '#3B3A39',
                    unselectedRectColor: range.series.length ? 'transparent' : '#A19F9D',
                    thumpLineColor: '#A19F9D',
                    thumbBackground: '#FFFFFF',
                    gripColor: '#605E5C',
                    background: 'transparent',
                    thumbHoverColor: '#FFFFFF',
                    selectedRegionColor: range.series.length ? 'rgba(161, 159, 157, 0.1)' : '#ADB5BD',
                    tooltipBackground: '#FFFFFF',
                    tooltipFontColor: '#323130',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            case 'FluentDark':
                style = {
                    gridLineColor: '#414040',
                    axisLineColor: '#3B3A39',
                    labelFontColor: '#C8C6C4',
                    unselectedRectColor: range.series.length ? 'transparent' : '#A19F9D',
                    thumpLineColor: '#797775',
                    thumbBackground: 'black',
                    gripColor: '#797775',
                    background: 'transparent',
                    thumbHoverColor: 'black',
                    selectedRegionColor: range.series.length ? 'rgba(121, 119, 117, 0.1)' : '#797775',
                    tooltipBackground: '#252423',
                    tooltipFontColor: '#F3F2F1',
                    thumbWidth: thumbWidth,
                    thumbHeight: thumbHeight
                };
                break;
            default:
                style.selectedRegionColor = range.series.length ? 'transparent' : '#FF4081';
                break;
        }
        return style;
    }
    exports.getRangeThemeColor = getRangeThemeColor;
});
