import { createWidget } from 'discourse/widgets/widget';
import showModal from 'discourse/lib/show-modal';
import { getOwner } from 'discourse-common/lib/get-owner';

export default createWidget('event-list-controls', {
  tagName: 'div.event-list-controls',

  html(attrs) {
    const user = this.currentUser;
    let links = [];

    if (user && user.staff) {
      links.push(this.attach('link', {
        icon: 'plus',
        label: 'event_list.create',
        action: 'createEvent',
      }));
    }

    return links;
  },

  createEvent() {
    const category = this.attrs.category;
    const controller = getOwner(this).lookup('controller:composer');

    let attrs = {
      action: 'createTopic',
      draftKey: 'new_topic',
      draftSequence: 0,
      addProperties: {
        currentType: 'event'
      }
    };

    if (category) {
      attrs['categoryId'] = category.id;
    }

    controller.open(attrs);
  }
})