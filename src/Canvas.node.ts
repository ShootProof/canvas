import EventEmitter from 'events';
import {
  Canvas as NodeCanvas,
  CanvasRenderingContext2D as NodeCanvasRenderingContext2D,
} from 'canvas';
import Image from './Image.node';

const originalDrawImage = NodeCanvasRenderingContext2D.prototype.drawImage;

NodeCanvasRenderingContext2D.prototype.drawImage = function(...args: any[]): void {
  const image = args[0];

  if (image instanceof Image) {
    originalDrawImage.apply(this, [image.__image__, ...args.slice(1)]);
  } else if (image instanceof Canvas) {
    image.__context__;

    originalDrawImage.apply(this, [image.__canvas__, ...args.slice(1)]);
  } else {
    originalDrawImage.apply(this, args);
  }
}

export default class Canvas implements HTMLCanvasElement {
  __canvas__: NodeCanvas;
  __events__: EventEmitter;
  __contextType__?: '2d' | 'webgl';

  constructor() {
    this.__canvas__ = new NodeCanvas(300, 150);
    this.__events__ = new EventEmitter();
  }

  get __context__() {
    return this.__contextType__ === '2d' ? this.__canvas__.getContext('2d') : null;
  }

  get height(): number {
    return this.__canvas__.height;
  }

  set height(value: number) {
    this.__canvas__.height = value;
  }

  get width(): number {
    return this.__canvas__.width;
  }

  set width(value: number) {
    this.__canvas__.width = value;
  }

  captureStream(_frameRequestRate?: number): MediaStream {
    throw new Error("Method not implemented.");
  }

  getContext(contextId: '2d', options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
  getContext(contextId: 'bitmaprenderer', options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
  getContext(contextId: 'webgl', options?: WebGLContextAttributes): WebGLRenderingContext | null;
  getContext(contextId: 'webgl2', options?: WebGLContextAttributes): WebGL2RenderingContext | null;
  getContext(contextId: string, options?: any): RenderingContext | null;
  getContext(contextId: any, options?: any): RenderingContext | null {
    if (this.__contextType__ !== undefined && this.__contextType__ !== contextId) {
      return null;
    }

    switch (contextId) {
      case '2d': {
        this.__contextType__ = contextId;
        return this.__canvas__.getContext(contextId, options) as CanvasRenderingContext2D;
      }
    }

    return null;
  }

  toBlob(_callback: BlobCallback, _type?: string, _quality?: any): void {
    throw new Error('Method not implemented.');
  }

  toDataURL(): string;
	toDataURL(mimeType: 'image/png'): string;
	toDataURL(mimeType: 'image/jpeg', quality?: number): string;
  toDataURL(type: any = 'image/png', quality?: any): string {
    return this.__canvas__.toDataURL(type, quality);
  }
  
  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, event: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: any, listener: any, _options?: any): void {
    this.__events__.addListener(type, listener);
  }

  removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, event: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: any, listener: any, _options?: any): void {
    if (listener) {
      this.__events__.removeListener(type, listener);
    } else {
      this.__events__.removeAllListeners(type);
    }
  }

  get accessKey(): string {
    return '';
  }

  get accessKeyLabel(): string {
    return '';
  }

  get autocapitalize(): string {
    return '';
  }

  set autocapitalize(_value: string) {
    throw new Error('Method not implemented.');
  }

  get dir(): string {
    return '';
  }

  get draggable(): boolean {
    return false;
  }

  set draggable(_value: boolean) {
    throw new Error('Method not implemented.');
  }

  get hidden(): boolean {
    return false;
  }

  set hidden(_value: boolean) {
    throw new Error('Method not implemented.');
  }

  get innerText(): string {
    return '';
  }

  set innerText(_value: string) {
    throw new Error('Method not implemented.');
  }

  get outerText(): string {
    return '';
  }

  set outerText(_value: string) {
    throw new Error('Method not implemented.');
  }

  get lang(): string {
    return '';
  }

  set lang(_value: string) {
    throw new Error('Method not implemented.');
  }

  get offsetHeight(): number {
    return 0;
  }

  get offsetLeft(): number {
    return 0;
  }

  get offsetParent(): Element | null {
    return null;
  }

  get offsetTop(): number {
    return 0;
  }

  get offsetWidth(): number {
    return 0;
  }

  get spellcheck(): boolean {
    return true;
  }

  set spellcheck(_value: boolean) {
    throw new Error('Method not implemented.');
  }

  get title(): string {
    return '';
  }

  set title(_value: string) {
    throw new Error('Method not implemented.');
  }

  get translate(): boolean {
    return true;
  }

  set translate(_value: boolean) {
    throw new Error('Method not implemented.');
  }

  click(): void {
    throw new Error('Method not implemented.');
  }

  get attributes(): NamedNodeMap {
    throw new Error('Method not implemented.');
  }

  get classList(): DOMTokenList {
    throw new Error('Method not implemented.');
  }

  get className(): string {
    return '';
  }

  get clientHeight(): number {
    return this.height;
  }

  get clientLeft(): number {
    return 0;
  }

  get clientTop(): number {
    return 0;
  }

  get clientWidth(): number {
    return this.width;
  }

  get id(): string {
    return '';
  }

  get localName(): string {
    return 'canvas';
  }

  get namespaceURI(): string | null {
    return 'http://www.w3.org/1999/xhtml';
  }

  get onfullscreenchange(): ((this: Element, event: Event) => any) | null {
    return null;
  }

  set onfullscreenchange(_handler: ((this: Element, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onfullscreenerror(): ((this: Element, event: Event) => any) | null {
    return null;
  }

  set onfullscreenerror(_handler: ((this: Element, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get outerHTML(): string{
    throw new Error('Method not implemented.');
  }

  get ownerDocument(): Document {
    throw new Error('Method not implemented.');
  }

  get part(): DOMTokenList {
    throw new Error('Method not implemented.');
  }

  get prefix(): string | null {
    return null;
  }

  get scrollHeight(): number {
    return 0;
  }

  get scrollLeft(): number {
    return 0;
  }

  get scrollTop(): number {
    return 0;
  }

  get scrollWidth(): number {
    return 0;
  }

  get shadowRoot(): ShadowRoot | null {
    return null;
  }

  get slot(): string {
    return '';
  }

  get tagName(): string {
    return 'CANVAS';
  }

  attachShadow(_init: ShadowRootInit): ShadowRoot {
    throw new Error('Method not implemented.');
  }

  closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
  closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
  closest<E extends Element = Element>(selector: string): E | null;
  closest<K1 extends keyof HTMLElementTagNameMap, K2 extends keyof SVGElementTagNameMap, E extends Element = Element>(_selector: any): E | HTMLElementTagNameMap[K1] | SVGElementTagNameMap[K2] | null {
    throw new Error('Method not implemented.');
  }

  getAttribute(_qualifiedName: string): string | null {
    throw new Error('Method not implemented.');
  }

  getAttributeNS(_namespace: string | null, _localName: string): string | null {
    throw new Error('Method not implemented.');
  }

  getAttributeNames(): string[] {
    throw new Error('Method not implemented.');
  }

  getAttributeNode(_qualifiedName: string): Attr | null {
    throw new Error('Method not implemented.');
  }

  getAttributeNodeNS(_namespace: string | null, _localName: string): Attr | null {
    throw new Error('Method not implemented.');
  }

  getBoundingClientRect(): DOMRect {
    throw new Error('Method not implemented.');
  }

  getClientRects(): DOMRectList {
    throw new Error('Method not implemented.');
  }

  getElementsByClassName(_classNames: string): HTMLCollectionOf<Element> {
    throw new Error('Method not implemented.');
  }

  getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
  getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
  getElementsByTagName<K1 extends keyof HTMLElementTagNameMap, K2 extends keyof SVGElementTagNameMap>(_qualifiedName: any): HTMLCollectionOf<Element> | HTMLCollectionOf<HTMLElementTagNameMap[K1]> | HTMLCollectionOf<SVGElementTagNameMap[K2]> {
    throw new Error('Method not implemented.');
  }

  getElementsByTagNameNS(namespaceURI: 'http://www.w3.org/1999/xhtml', localName: string): HTMLCollectionOf<HTMLElement>;
  getElementsByTagNameNS(namespaceURI: 'http://www.w3.org/2000/svg', localName: string): HTMLCollectionOf<SVGElement>;
  getElementsByTagNameNS(namespaceURI: string, localName: string): HTMLCollectionOf<Element>;
  getElementsByTagNameNS(_namespaceURI: any, _localName: any): HTMLCollectionOf<Element> | HTMLCollectionOf<HTMLElement> | HTMLCollectionOf<SVGElement> {
    throw new Error('Method not implemented.');
  }

  hasAttribute(_qualifiedName: string): boolean {
    throw new Error('Method not implemented.');
  }

  hasAttributeNS(_namespace: string | null, _localName: string): boolean {
    throw new Error('Method not implemented.');
  }

  hasAttributes(): boolean {
    throw new Error('Method not implemented.');
  }

  hasPointerCapture(_pointerId: number): boolean {
    throw new Error('Method not implemented.');
  }

  insertAdjacentElement(_position: InsertPosition, _insertedElement: Element): Element | null {
    throw new Error('Method not implemented.');
  }

  insertAdjacentHTML(_where: InsertPosition, _html: string): void {
    throw new Error('Method not implemented.');
  }

  insertAdjacentText(_where: InsertPosition, _text: string): void {
    throw new Error('Method not implemented.');
  }

  matches(_selectors: string): boolean {
    throw new Error('Method not implemented.');
  }

  releasePointerCapture(_pointerId: number): void {
    throw new Error('Method not implemented.');
  }

  removeAttribute(_qualifiedName: string): void {
    throw new Error('Method not implemented.');
  }

  removeAttributeNS(_namespace: string | null, _localName: string): void {
    throw new Error('Method not implemented.');
  }

  removeAttributeNode(_attr: Attr): Attr {
    throw new Error('Method not implemented.');
  }

  requestFullscreen(_options?: FullscreenOptions): Promise<void> {
    throw new Error('Method not implemented.');
  }

  requestPointerLock(): void {
    throw new Error('Method not implemented.');
  }

  scroll(options?: ScrollToOptions): void;
  scroll(x: number, y: number): void;
  scroll(_x?: any, _y?: any): void {
    throw new Error('Method not implemented.');
  }

  scrollBy(options?: ScrollToOptions): void;
  scrollBy(x: number, y: number): void;
  scrollBy(_x?: any, _y?: any): void {
    throw new Error('Method not implemented.');
  }

  scrollIntoView(_arg?: boolean | ScrollIntoViewOptions): void {
    throw new Error('Method not implemented.');
  }

  scrollTo(options?: ScrollToOptions): void;
  scrollTo(x: number, y: number): void;
  scrollTo(_x?: any, _y?: any): void {
    throw new Error('Method not implemented.');
  }

  setAttribute(_qualifiedName: string, _value: string): void {
    throw new Error('Method not implemented.');
  }

  setAttributeNS(_namespace: string | null, _qualifiedName: string, _value: string): void {
    throw new Error('Method not implemented.');
  }

  setAttributeNode(_attr: Attr): Attr | null {
    throw new Error('Method not implemented.');
  }

  setAttributeNodeNS(_attr: Attr): Attr | null {
    throw new Error('Method not implemented.');
  }

  setPointerCapture(_pointerId: number): void {
    throw new Error('Method not implemented.');
  }

  toggleAttribute(_qualifiedName: string, _force?: boolean): boolean {
    throw new Error('Method not implemented.');
  }

  webkitMatchesSelector(_selectors: string): boolean {
    throw new Error('Method not implemented.');
  }

  get baseURI(): string {
    return '';
  }

  get childNodes(): NodeListOf<ChildNode> {
    throw new Error('Method not implemented.');
  }

  get firstChild(): ChildNode | null {
    return null;
  }

  get isConnected(): boolean {
    return false;
  }

  get lastChild(): ChildNode | null {
    return null;
  }

  get nextSibling(): ChildNode | null {
    return null;
  }

  get nodeName(): string {
    return 'CANVAS';
  }

  get nodeType(): number {
    return 1;
  }

  get nodeValue(): string | null {
    return null;
  }

  get parentElement(): HTMLElement | null {
    return null;
  }

  get parentNode(): (Node & ParentNode) | null {
    return null;
  }

  get previousSibling(): ChildNode | null {
    return null;
  }

  get textContent(): string | null {
    return '';
  }

  set textContent(_value: string | null) {
    throw new Error('Method not implemented.');
  }

  appendChild<T extends Node>(_newChild: T): T {
    throw new Error('Method not implemented.');
  }

  cloneNode(_deep?: boolean): Node {
    throw new Error('Method not implemented.');
  }

  compareDocumentPosition(_other: Node): number {
    throw new Error('Method not implemented.');
  }

  contains(_other: Node | null): boolean {
    throw new Error('Method not implemented.');
  }

  getRootNode(_options?: GetRootNodeOptions): Node {
    throw new Error('Method not implemented.');
  }

  hasChildNodes(): boolean {
    throw new Error('Method not implemented.');
  }

  insertBefore<T extends Node>(_newChild: T, _refChild: Node | null): T {
    throw new Error('Method not implemented.');
  }

  isDefaultNamespace(_namespace: string | null): boolean {
    throw new Error('Method not implemented.');
  }

  isEqualNode(_otherNode: Node | null): boolean {
    throw new Error('Method not implemented.');
  }

  isSameNode(_otherNode: Node | null): boolean {
    throw new Error('Method not implemented.');
  }

  lookupNamespaceURI(_prefix: string | null): string | null {
    throw new Error('Method not implemented.');
  }

  lookupPrefix(_namespace: string | null): string | null {
    throw new Error('Method not implemented.');
  }

  normalize(): void {
    throw new Error('Method not implemented.');
  }

  removeChild<T extends Node>(_oldChild: T): T {
    throw new Error('Method not implemented.');
  }

  replaceChild<T extends Node>(_newChild: Node, _oldChild: T): T {
    throw new Error('Method not implemented.');
  }

  get ATTRIBUTE_NODE(): number {
    return 2;
  }

  get CDATA_SECTION_NODE(): number {
    return 4;
  }

  get COMMENT_NODE(): number {
    return 8;
  }

  get DOCUMENT_FRAGMENT_NODE(): number {
    return 11;
  }

  get DOCUMENT_NODE(): number {
    return 9;
  }

  get DOCUMENT_POSITION_CONTAINED_BY(): number {
    return 16;
  }

  get DOCUMENT_POSITION_CONTAINS(): number {
    return 8;
  }

  get DOCUMENT_POSITION_DISCONNECTED(): number {
    return 1;
  }

  get DOCUMENT_POSITION_FOLLOWING(): number {
    return 4;
  }

  get DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC(): number {
    return 32;
  }

  get DOCUMENT_POSITION_PRECEDING(): number {
    return 2;
  }

  get DOCUMENT_TYPE_NODE(): number {
    return 10;
  }

  get ELEMENT_NODE(): number {
    return 1;
  }

  get ENTITY_NODE(): number {
    return 6;
  }

  get ENTITY_REFERENCE_NODE(): number {
    return 5;
  }

  get NOTATION_NODE(): number {
    return 12;
  }

  get PROCESSING_INSTRUCTION_NODE(): number {
    return 7;
  }

  get TEXT_NODE(): number {
    return 3;
  }

  dispatchEvent(_event: Event): boolean {
    throw new Error('Method not implemented.');
  }

  get ariaAtomic(): string {
    throw new Error('Method not implemented.');
  }

  get ariaAutoComplete(): string {
    throw new Error('Method not implemented.');
  }

  get ariaBusy(): string {
    throw new Error('Method not implemented.');
  }

  get ariaChecked(): string {
    throw new Error('Method not implemented.');
  }

  get ariaColCount(): string {
    throw new Error('Method not implemented.');
  }

  get ariaColIndex(): string {
    throw new Error('Method not implemented.');
  }

  get ariaColSpan(): string {
    throw new Error('Method not implemented.');
  }

  get ariaCurrent(): string {
    throw new Error('Method not implemented.');
  }

  get ariaDisabled(): string {
    throw new Error('Method not implemented.');
  }

  get ariaExpanded(): string {
    throw new Error('Method not implemented.');
  }

  get ariaHasPopup(): string {
    throw new Error('Method not implemented.');
  }

  get ariaHidden(): string {
    throw new Error('Method not implemented.');
  }

  get ariaKeyShortcuts(): string {
    throw new Error('Method not implemented.');
  }

  get ariaLabel(): string {
    throw new Error('Method not implemented.');
  }

  get ariaLevel(): string {
    throw new Error('Method not implemented.');
  }

  get ariaLive(): string {
    throw new Error('Method not implemented.');
  }

  get ariaModal(): string {
    throw new Error('Method not implemented.');
  }

  get ariaMultiLine(): string {
    throw new Error('Method not implemented.');
  }

  get ariaMultiSelectable(): string {
    throw new Error('Method not implemented.');
  }

  get ariaOrientation(): string {
    throw new Error('Method not implemented.');
  }

  get ariaPlaceholder(): string {
    throw new Error('Method not implemented.');
  }

  get ariaPosInSet(): string {
    throw new Error('Method not implemented.');
  }

  get ariaPressed(): string {
    throw new Error('Method not implemented.');
  }

  get ariaReadOnly(): string {
    throw new Error('Method not implemented.');
  }

  get ariaRequired(): string {
    throw new Error('Method not implemented.');
  }

  get ariaRoleDescription(): string {
    throw new Error('Method not implemented.');
  }

  get ariaRowCount(): string {
    throw new Error('Method not implemented.');
  }

  get ariaRowIndex(): string {
    throw new Error('Method not implemented.');
  }

  get ariaRowSpan(): string {
    throw new Error('Method not implemented.');
  }

  get ariaSelected(): string {
    throw new Error('Method not implemented.');
  }

  get ariaSetSize(): string {
    throw new Error('Method not implemented.');
  }

  get ariaSort(): string {
    throw new Error('Method not implemented.');
  }

  get ariaValueMax(): string {
    throw new Error('Method not implemented.');
  }

  get ariaValueMin(): string {
    throw new Error('Method not implemented.');
  }

  get ariaValueNow(): string {
    throw new Error('Method not implemented.');
  }

  get ariaValueText(): string {
    throw new Error('Method not implemented.');
  }

  animate(_keyframes: Keyframe[] | PropertyIndexedKeyframes | null, _options?: number | KeyframeAnimationOptions): Animation {
    throw new Error('Method not implemented.');
  }

  getAnimations(): Animation[] {
    throw new Error('Method not implemented.');
  }

  after(..._nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }

  before(..._nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }

  remove(): void {
    throw new Error('Method not implemented.');
  }

  replaceWith(..._nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }

  get innerHTML(): string {
    return '';
  }

  get nextElementSibling(): Element | null {
    return null;
  }

  get previousElementSibling(): Element | null {
    return null;
  }

  get childElementCount(): number {
    return 0;
  }

  get children(): HTMLCollection {
    throw new Error('Method not implemented.');
  }

  get firstElementChild(): Element | null {
    return null;
  }

  get lastElementChild(): Element | null {
    return null;
  }

  append(..._nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }

  prepend(..._nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }

  querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
  querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
  querySelector<E extends Element = Element>(selectors: string): E | null;
  querySelector<K1 extends keyof HTMLElementTagNameMap, K2 extends keyof SVGElementTagNameMap, E extends Element = Element>(_selectors: any): E | HTMLElementTagNameMap[K1] | SVGElementTagNameMap[K2] | null {
    throw new Error('Method not implemented.');
  }

  querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
  querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
  querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
  querySelectorAll<K1 extends keyof HTMLElementTagNameMap, K2 extends keyof SVGElementTagNameMap, E extends Element = Element>(_selectors: any): NodeListOf<HTMLElementTagNameMap[K1]> | NodeListOf<SVGElementTagNameMap[K2]> | NodeListOf<E> {
    throw new Error('Method not implemented.');
  }

  replaceChildren(..._nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }

  get assignedSlot(): HTMLSlotElement | null {
    return null;
  }

  get oncopy(): ((this: DocumentAndElementEventHandlers, event: ClipboardEvent) => any) | null {
    return null;
  }

  set oncopy(_handler: ((this: DocumentAndElementEventHandlers, event: ClipboardEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get oncut(): ((this: DocumentAndElementEventHandlers, event: ClipboardEvent) => any) | null {
    return null;
  }

  set oncut(_handler: ((this: DocumentAndElementEventHandlers, event: ClipboardEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpaste(): ((this: DocumentAndElementEventHandlers, event: ClipboardEvent) => any) | null {
    return null;
  }

  set onpaste(_handler: ((this: DocumentAndElementEventHandlers, event: ClipboardEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get style(): CSSStyleDeclaration {
    throw new Error('Method not implemented.');
  }

  get contentEditable(): string {
    return 'inherit';
  }

  get enterKeyHint(): string {
    return '';
  }

  get inputMode(): string {
    return '';
  }

  get isContentEditable(): boolean {
    return false;
  }

  get onabort(): ((this: GlobalEventHandlers, event: UIEvent) => any) | null {
    return null;
  }

  set onabort(_handler: ((this: GlobalEventHandlers, event: UIEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onanimationcancel(): ((this: GlobalEventHandlers, event: AnimationEvent) => any) | null {
    return null;
  }

  set onanimationcancel(_handler: ((this: GlobalEventHandlers, event: AnimationEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onanimationend(): ((this: GlobalEventHandlers, event: AnimationEvent) => any) | null {
    return null;
  }

  set onanimationend(_handler: ((this: GlobalEventHandlers, event: AnimationEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onanimationiteration(): ((this: GlobalEventHandlers, event: AnimationEvent) => any) | null {
    return null;
  }

  set onanimationiteration(_handler: ((this: GlobalEventHandlers, event: AnimationEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onanimationstart(): ((this: GlobalEventHandlers, event: AnimationEvent) => any) | null {
    return null;
  }

  set onanimationstart(_handler: ((this: GlobalEventHandlers, event: AnimationEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onauxclick(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set onauxclick(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onblur(): ((this: GlobalEventHandlers, event: FocusEvent) => any) | null {
    return null;
  }

  set onblur(_handler: ((this: GlobalEventHandlers, event: FocusEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get oncanplay(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set oncanplay(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get oncanplaythrough(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set oncanplaythrough(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onchange(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onchange(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onclick(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set onclick(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onclose(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onclose(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get oncontextmenu(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set oncontextmenu(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get oncuechange(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set oncuechange(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ondblclick(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set ondblclick(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ondrag(): ((this: GlobalEventHandlers, event: DragEvent) => any) | null {
    return null;
  }

  set ondrag(_handler: ((this: GlobalEventHandlers, event: DragEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ondragend(): ((this: GlobalEventHandlers, event: DragEvent) => any) | null {
    return null;
  }

  set ondragend(_handler: ((this: GlobalEventHandlers, event: DragEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ondragenter(): ((this: GlobalEventHandlers, event: DragEvent) => any) | null {
    return null;
  }

  set ondragenter(_handler: ((this: GlobalEventHandlers, event: DragEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ondragleave(): ((this: GlobalEventHandlers, event: DragEvent) => any) | null {
    return null;
  }

  set ondragleave(_handler: ((this: GlobalEventHandlers, event: DragEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ondragover(): ((this: GlobalEventHandlers, event: DragEvent) => any) | null {
    return null;
  }

  set ondragover(_handler: ((this: GlobalEventHandlers, event: DragEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ondragstart(): ((this: GlobalEventHandlers, event: DragEvent) => any) | null {
    return null;
  }

  set ondragstart(_handler: ((this: GlobalEventHandlers, event: DragEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ondrop(): ((this: GlobalEventHandlers, event: DragEvent) => any) | null {
    return null;
  }

  set ondrop(_handler: ((this: GlobalEventHandlers, event: DragEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ondurationchange(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set ondurationchange(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onemptied(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onemptied(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onended(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onended(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onerror(): OnErrorEventHandler {
    return null;
  }

  set onerror(_handler: OnErrorEventHandler) {
    throw new Error('Method not implemented.');
  }

  get onfocus(): ((this: GlobalEventHandlers, event: FocusEvent) => any) | null {
    return null;
  }

  set onfocus(_handler: ((this: GlobalEventHandlers, event: FocusEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onformdata(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onformdata(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ongotpointercapture(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set ongotpointercapture(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get oninput(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set oninput(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get oninvalid(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set oninvalid(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onkeydown(): ((this: GlobalEventHandlers, event: KeyboardEvent) => any) | null {
    return null;
  }

  set onkeydown(_handler: ((this: GlobalEventHandlers, event: KeyboardEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onkeypress(): ((this: GlobalEventHandlers, event: KeyboardEvent) => any) | null {
    return null;
  }

  set onkeypress(_handler: ((this: GlobalEventHandlers, event: KeyboardEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onkeyup(): ((this: GlobalEventHandlers, event: KeyboardEvent) => any) | null {
    return null;
  }

  set onkeyup(_handler: ((this: GlobalEventHandlers, event: KeyboardEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onload(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onload(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onloadeddata(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onloadeddata(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onloadedmetadata(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onloadedmetadata(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onloadstart(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onloadstart(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onlostpointercapture(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set onlostpointercapture(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onmousedown(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set onmousedown(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onmouseenter(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set onmouseenter(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onmouseleave(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set onmouseleave(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onmousemove(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set onmousemove(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onmouseout(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set onmouseout(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onmouseover(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set onmouseover(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onmouseup(): ((this: GlobalEventHandlers, event: MouseEvent) => any) | null {
    return null;
  }

  set onmouseup(_handler: ((this: GlobalEventHandlers, event: MouseEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpause(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onpause(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onplay(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onplay(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onplaying(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onplaying(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpointercancel(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set onpointercancel(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpointerdown(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set onpointerdown(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpointerenter(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set onpointerenter(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpointerleave(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set onpointerleave(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpointermove(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set onpointermove(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpointerout(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set onpointerout(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpointerover(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set onpointerover(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onpointerup(): ((this: GlobalEventHandlers, event: PointerEvent) => any) | null {
    return null;
  }

  set onpointerup(_handler: ((this: GlobalEventHandlers, event: PointerEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onprogress(): ((this: GlobalEventHandlers, event: ProgressEvent<EventTarget>) => any) | null {
    return null;
  }

  set onprogress(_handler: ((this: GlobalEventHandlers, event: ProgressEvent<EventTarget>) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onratechange(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onratechange(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onreset(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onreset(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onresize(): ((this: GlobalEventHandlers, event: UIEvent) => any) | null {
    return null;
  }

  set onresize(_handler: ((this: GlobalEventHandlers, event: UIEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onscroll(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onscroll(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onseeked(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onseeked(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onseeking(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onseeking(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onselect(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onselect(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onselectionchange(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onselectionchange(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onselectstart(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onselectstart(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onstalled(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onstalled(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onsubmit(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onsubmit(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onsuspend(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onsuspend(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontimeupdate(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set ontimeupdate(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontoggle(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set ontoggle(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontouchcancel(): ((this: GlobalEventHandlers, event: TouchEvent) => any) | null {
    return null;
  }

  set ontouchcancel(_handler: ((this: GlobalEventHandlers, event: TouchEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontouchend(): ((this: GlobalEventHandlers, event: TouchEvent) => any) | null {
    return null;
  }

  set ontouchend(_handler: ((this: GlobalEventHandlers, event: TouchEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontouchmove(): ((this: GlobalEventHandlers, event: TouchEvent) => any) | null {
    return null;
  }

  set ontouchmove(_handler: ((this: GlobalEventHandlers, event: TouchEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontouchstart(): ((this: GlobalEventHandlers, event: TouchEvent) => any) | null {
    return null;
  }

  set ontouchstart(_handler: ((this: GlobalEventHandlers, event: TouchEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontransitioncancel(): ((this: GlobalEventHandlers, event: TransitionEvent) => any) | null {
    return null;
  }

  set ontransitioncancel(_handler: ((this: GlobalEventHandlers, event: TransitionEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontransitionend(): ((this: GlobalEventHandlers, event: TransitionEvent) => any) | null {
    return null;
  }

  set ontransitionend(_handler: ((this: GlobalEventHandlers, event: TransitionEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontransitionrun(): ((this: GlobalEventHandlers, event: TransitionEvent) => any) | null {
    return null;
  }

  set ontransitionrun(_handler: ((this: GlobalEventHandlers, event: TransitionEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get ontransitionstart(): ((this: GlobalEventHandlers, event: TransitionEvent) => any) | null {
    return null;
  }

  set ontransitionstart(_handler: ((this: GlobalEventHandlers, event: TransitionEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onvolumechange(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onvolumechange(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onwaiting(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onwaiting(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onwebkitanimationend(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onwebkitanimationend(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onwebkitanimationiteration(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onwebkitanimationiteration(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onwebkitanimationstart(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onwebkitanimationstart(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onwebkittransitionend(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onwebkittransitionend(_handler: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onwheel(): ((this: GlobalEventHandlers, event: WheelEvent) => any) | null {
    return null;
  }

  set onwheel(_handler: ((this: GlobalEventHandlers, event: WheelEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get dataset(): DOMStringMap {
    throw new Error('Method not implemented.');
  }

  get nonce(): string | undefined {
    return '';
  }

  set nonce(_value: string | undefined) {
    throw new Error('Method not implemented.');
  }

  get tabIndex(): number {
    return -1;
  }

  set tabIndex(_value: number) {
    throw new Error('Method not implemented.');
  }

  blur(): void {
    throw new Error('Method not implemented.');
  }

  focus(_options?: FocusOptions): void {
    throw new Error('Method not implemented.');
  }

  attachInternals(): ElementInternals {
    throw new Error('Method not implemented.');
  }

  get onsecuritypolicyviolation(): ((this: GlobalEventHandlers, event: SecurityPolicyViolationEvent) => any) | null {
    return null;
  }

  set onsecuritypolicyviolation(_value: ((this: GlobalEventHandlers, event: SecurityPolicyViolationEvent) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get onslotchange(): ((this: GlobalEventHandlers, event: Event) => any) | null {
    return null;
  }

  set onslotchange(_value: ((this: GlobalEventHandlers, event: Event) => any) | null) {
    throw new Error('Method not implemented.');
  }

  get autofocus(): boolean {
    return false;
  }

  set autofocus(_value: boolean) {
    throw new Error('Method not implemented.');
  }
}
