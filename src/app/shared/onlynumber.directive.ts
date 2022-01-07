import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[OnlyNumber]'
})
export class OnlyNumber {

    constructor(private el: ElementRef) { }

    @Input() OnlyNumber: boolean;

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        const e = <KeyboardEvent>event;
        let code: any;
        if (event.keyCode !== undefined) {
            code = event.keyCode;
        }
        if (this.OnlyNumber) {
            if ([46, 8, 9, 27, 13].indexOf(code) !== -1 ||
                // Allow: Ctrl+A
                (code === 65 && e.ctrlKey) ||
                // Allow: Ctrl+C
                (code === 67 && e.ctrlKey) ||
                // Allow: Ctrl+X
                (code === 88 && e.ctrlKey) ||
                // Allow: home, end, left, right
                (code >= 35 && code <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (code < 48 || code > 57)) && (code < 96 || code > 105)) {
                e.preventDefault();
            }
        }
    }
    @HostListener('keyup', ['$event']) onKeyUp(event) {
        const e = <KeyboardEvent>event;
        let code: any;
        if (event.keyCode !== undefined) {
            code = event.keyCode;
        }
        if (this.OnlyNumber) {
            if ([46, 8, 9, 27, 13].indexOf(code) !== -1 ||
                // Allow: Ctrl+A
                (code === 65 && e.ctrlKey) ||
                // Allow: Ctrl+C
                (code === 67 && e.ctrlKey) ||
                // Allow: Ctrl+X
                (code === 88 && e.ctrlKey) ||
                // Allow: home, end, left, right
                (code >= 35 && code <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (code < 48 || code > 57)) && (code < 96 || code > 105)) {
                e.preventDefault();
            }
        }
    }
    @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
        e.preventDefault();
    }

    @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
        e.preventDefault();
    }

    @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
        e.preventDefault();
    }
}