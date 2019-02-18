import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'social-share-stencil',
  styleUrl: 'social-share-stencil.css',
  shadow: true
})
export class SocialShareStencil {

  /**
   * Is the list expanded or not
   */
  @Prop({ mutable: true, reflectToAttr: true}) show: boolean;

  /**
   * The event triggerd when an item is clicked
   */
  @Event({ eventName: 'share-to', bubbles: true }) shareTo: EventEmitter

  @State() platforms = ['facebook', 'twitter', 'linkedin', 'whatsapp']

  render() {
    return (
      <div class="wrapper">
        <strong class="platform">Stencil</strong>
        <button class="toggle" onClick={() => this.show = !this.show}><img src="/images/share.svg" alt="share"/></button>
        <ul class="list">
            {this.platforms.map((platform, index) =>
              <li class="list-item" style={{
                transform: `translateY(${(index + 1) * 3.25}em)`,
                zIndex: `-${index + 1}`
              }}>
                <button data-platform={platform} onClick={() => {this.shareTo.emit(platform); this.show = false;}}>
                  <img src={'/images/' + platform + '.svg'} alt={platform}/>
                </button>
              </li>
            )}
        </ul>
      </div>
    );
  }
}
