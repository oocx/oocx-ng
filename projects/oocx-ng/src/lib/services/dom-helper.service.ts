import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DomHelperService {

  public findParentCell(e: Element) {
    while (e && e.tagName.toLowerCase() !== 'td') {
      e = e.parentElement;
    }
    return e;
  }

  public findNextWithInput(e: Element) {
    if (!e) { return; }

    e = e.nextElementSibling;
    while (e) {
      const input = e.querySelector('input');
      if (input) {
        return input;
      }
      e = e.nextElementSibling;
    }
    return null;
  }

  public findPreviousWithInput(e: Element) {
    if (!e) { return; }

    e = e.previousElementSibling;
    while (e) {
      const input = e.querySelector('input');
      if (input) {
        return input;
      }
      e = e.previousElementSibling;
    }
    return null;
  }

  public focusPreviousCell(e: Element) {
    const parent = this.findParentCell(e);
    const input = this.findPreviousWithInput(parent);
    if (input) {
      input.focus();
    }
  }

  public focusNextCell(e: Element) {
    const parent = this.findParentCell(e);
    const input = this.findNextWithInput(parent);
    if (input) {
      input.focus();
    }
  }

  private findNextSibling(e: Element): HTMLInputElement | HTMLButtonElement {
    e = e.nextElementSibling || e.parentElement.nextElementSibling;
    while (e) {
      if (e.tagName === 'INPUT' || e.tagName === 'BUTTON' || e.tagName === 'SELECT') {
        return <HTMLInputElement|HTMLButtonElement>e;
      }
      const child = e.querySelector('input, button, select');
      if (child) {
        return <HTMLInputElement|HTMLButtonElement>child;
      }
      e = e.nextElementSibling || e.parentElement.nextElementSibling;
    }
    return null;
  }
  public focusNextSibling(e: Element) {
    const input = this.findNextSibling(e);
    if (input) {
      input.focus();
    }
  }

}
