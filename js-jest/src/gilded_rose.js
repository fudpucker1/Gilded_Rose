class Item {
  constructor(name, daysLeftToSell, quality, conjured){
    this.name = name;
    this.daysLeftToSell = daysLeftToSell;
    this.quality = quality;
    this.conjured = conjured;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.defaultQualityDegradeAppreciateValue = 1;
  }

  processItemsAtShopAfterFullDay() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].conjured === false ){
        this.checkItemNameForProcessing(this.items[i])
      } else {
        this.updateConjuredQuality(this.items[i])
      };

      this.updateDaysLeftToSell(this.items[i])
      return this.items;
    }
  }

  checkItemNameForProcessing(item) {
    switch (item.name){
      case 'Aged Brie':
        this.updateAgedBrieQuality(item)
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        this.updateConcertTicketQuality(item)
        break;
      case 'Sulfuras, Hand of Ragnaros': // legendary items do not suffer quality degradation
        break;
      default:
        this.updateNormalItemQuality(item)
    }
  }

  updateConjuredQuality(item) {
    const itemIsOverDue = this.isItemPastSellDate(item);

    if (itemIsOverDue){
      item.quality -= 4 * this.defaultQualityDegradeAppreciateValue;
    } else {
      item.quality -= 2 * this.defaultQualityDegradeAppreciateValue;
    }
    this.qualityLessThanZeroCorrection(item)
  }

  updateNormalItemQuality(item) {
    const itemIsOverDue = this.isItemPastSellDate(item);

    if (itemIsOverDue){
      item.quality -= 2 * this.defaultQualityDegradeAppreciateValue;
    } else {
      item.quality -= 1 * this.defaultQualityDegradeAppreciateValue;
    }

    this.qualityLessThanZeroCorrection(item)
  }

  updateAgedBrieQuality(item) {
      item.quality += 1;
      this.qualityOverFiftyCorrection(item);
  }

  updateConcertTicketQuality(item) {
    switch(true){
      case (item.daysLeftToSell <= 5):
        item.quality += 3;
        break
      case (item.daysLeftToSell <= 10):
        item.quality += 2;
        break
      default:
        item.quality += 1 * this.defaultQualityDegradeAppreciateValue;
    }
    this.qualityOverFiftyCorrection(item);
  }

  updateDaysLeftToSell(item) {
    item.daysLeftToSell -= 1;
  }

  isItemPastSellDate(item) {
    if (item.daysLeftToSell < 0){
      return true;
    }
  }

  qualityOverFiftyCorrection(item) {
    if (item.quality >= 50 ){
      item.quality = 50;
    }
  }

  qualityLessThanZeroCorrection(item) {
    if (item.quality < 0 ){
      item.quality = 0;
    }
  }

}

module.exports = {
  Item,
  Shop
}
