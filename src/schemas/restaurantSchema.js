restaurantSchemaExample = '{' + '\n' +
    '"name"' + ': ' + '"Green Food"' + ',' + '\n' +
    '"category"' + ': ' + '"Saudável"' + ',' + '\n' +
    '"deliveryEstimate"' + ': ' + '"75m"' + ',' + '\n' +
    '"rating"' + ': ' + '4.1' + ',' + '\n' +
    '"imagePath"' + ': ' + '"assets/img/restaurants/greenfood.png"' + ',' + '\n' +
    '"about"' + ': ' + '"Comidas caras"' + ',' + '\n' +
    '"hours"' + ': ' + '"Almoço das 11h às 15h"' + '\n' + '}';

restaurantSchema = '{' + '\n' +
    '"name"' + ': ' + '" "' + ',' + '\n' +
    '"category"' + ': ' + '" "' + ',' + '\n' +
    '"deliveryEstimate"' + ': ' + '" "' + ',' + '\n' +
    '"rating"' + ': ' + '0' + ',' + '\n' +
    '"imagePath"' + ': ' + '" "' + ',' + '\n' +
    '"about"' + ': ' + '" "' + ',' + '\n' +
    '"hours"' + ': ' + '" "' + '\n' + '}';

module.exports = {
    restaurantSchemaExample,
    restaurantSchema
}