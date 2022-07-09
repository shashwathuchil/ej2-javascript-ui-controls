define(["require", "exports", "@syncfusion/ej2-data"], function (require, exports, ej2_data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Data = (function () {
        function Data(dataSource, query) {
            this.initDataManager(dataSource, query);
        }
        Data.prototype.initDataManager = function (dataSource, query) {
            this.dataManager = dataSource instanceof ej2_data_1.DataManager ? dataSource : new ej2_data_1.DataManager(dataSource);
            this.query = query instanceof ej2_data_1.Query ? query : new ej2_data_1.Query();
        };
        Data.prototype.generateQuery = function () {
            var query = this.query.clone();
            return query;
        };
        Data.prototype.getData = function (dataQuery) {
            var _this = this;
            if (this.dataManager.ready) {
                var dataManagerDeferred_1 = new ej2_data_1.Deferred();
                var ready = this.dataManager.ready;
                ready.then(function () {
                    _this.dataManager.executeQuery(dataQuery).then(function (result) {
                        dataManagerDeferred_1.resolve(result);
                    });
                }).catch(function (e) { dataManagerDeferred_1.reject(e); });
                return dataManagerDeferred_1.promise;
            }
            else {
                return this.dataManager.executeQuery(dataQuery);
            }
        };
        return Data;
    }());
    exports.Data = Data;
});
