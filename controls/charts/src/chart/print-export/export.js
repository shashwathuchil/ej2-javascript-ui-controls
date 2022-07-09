define(["require", "exports", "../../common/utils/export", "../../common/model/constants"], function (require, exports, export_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Export = (function () {
        function Export(chart) {
            this.chart = chart;
        }
        Export.prototype.export = function (type, fileName, orientation, controls, width, height, isVertical, header, footer) {
            var exportChart = new export_1.ExportUtils(this.chart);
            controls = controls ? controls : [this.chart];
            var argsData = {
                cancel: false, name: constants_1.beforeExport, width: width, height: height
            };
            this.chart.trigger(constants_1.beforeExport, argsData);
            if (!argsData.cancel) {
                exportChart.export(type, fileName, orientation, controls, width = argsData.width, height = argsData.height, isVertical, header, footer);
            }
        };
        Export.prototype.getDataUrl = function (chart) {
            var exportUtil = new export_1.ExportUtils(chart);
            return exportUtil.getDataUrl(chart);
        };
        Export.prototype.getModuleName = function () {
            return 'Export';
        };
        Export.prototype.destroy = function () {
        };
        return Export;
    }());
    exports.Export = Export;
});
