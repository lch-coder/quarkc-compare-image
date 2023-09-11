import {
  QuarkElement,
  property,
  customElement,
  state,
  createRef,
} from "quarkc";
import style from "./index.less?inline";
import { ResizeSensor } from "css-element-queries";

declare global {
  interface HTMLElementTagNameMap {
    "quarkc-compare-image": QuarkCompareImage;
  }
}

@customElement({ tag: "quarkc-compare-image", style })
class QuarkCompareImage extends QuarkElement {
  @property()
  leftImage = "";

  @property()
  leftImageAlt = "";

  @property()
  leftLabel = "";

  @property()
  rightImage = "";

  @property()
  rightImageAlt = "";

  @property()
  rightLabel = "";

  @property({ type: Boolean })
  hover = false;

  @property({ type: Number })
  handleSize = 40;

  @property({ type: Number })
  sliderLineWidth = 2;

  @property({ type: Number })
  sliderPositionPercentage = 0.5;

  @state()
  positionPct: number = this.sliderPositionPercentage || 0.5;

  @state()
  imageWidth: number = 0;

  @state()
  rightLabelWidth: number = 0;

  containerRef = createRef();
  leftImageRef = createRef();
  rightImageRef = createRef();
  rightLabelRef = createRef();

  leftImageStyle() {
    return {
      clip: `rect(auto, ${this.imageWidth * this.positionPct}px, auto, auto)`,
    };
  }
  rightLabelStyle() {
    const cutLeft = Math.max(
      0,
      this.rightLabelWidth + this.imageWidth * (this.positionPct - 1)
    );
    return {
      clip: `rect(auto, auto, auto, ${cutLeft}px)`,
    };
  }
  sliderStyle() {
    return {
      cursor: !this.hover && "ew-resize",
      left: this.imageWidth * this.positionPct - this.handleSize / 2 + "px",
      width: `${this.handleSize}px`,
    };
  }
  sliderLineStyle() {
    return { width: `${this.sliderLineWidth}px` };
  }
  sliderHandleStyle() {
    return {
      border: `${this.sliderLineWidth}px solid white`,
      height: `${this.handleSize}px`,
      width: `${this.handleSize}px`,
    };
  }
  sliderLeftArrowStyle() {
    return {
      border: `inset ${this.handleSize * 0.15}px rgba(0,0,0,0)`,
      borderRight: `${this.handleSize * 0.15}px solid white`,
      marginLeft: `-${this.handleSize * 0.25}px`, // for IE11
      marginRight: `${this.handleSize * 0.25}px`,
    };
  }
  sliderRightArrowStyle() {
    return {
      border: `inset ${this.handleSize * 0.15}px rgba(0,0,0,0)`,
      borderLeft: `${this.handleSize * 0.15}px solid white`,
      marginRight: `-${this.handleSize * 0.25}px`, // for IE11
    };
  }

  getAndSetImageWidth() {
    this.imageWidth = this.rightImageRef.current.getBoundingClientRect().width;
    this.rightLabelWidth =
      this.rightLabelRef.current.getBoundingClientRect().width;
  }

  updateSliderPosition = (event) => {
    const e = event || window.event;

    // Calc Cursor Position from the left edge of the viewport
    const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX;

    // Calc Cursor Position from the left edge of the window (consider any page scrolling)
    const cursorXfromWindow = cursorXfromViewport - window.pageXOffset;

    // Calc Cursor Position from the left edge of the image
    const imagePosition = this.rightImageRef.current.getBoundingClientRect();
    let pos = cursorXfromWindow - imagePosition.left;

    // Set minimum and maximum values ​​to prevent the slider from overflowing
    const minPos = 0 + this.sliderLineWidth / 2;
    const maxPos = this.imageWidth - this.sliderLineWidth / 2;

    if (pos < minPos) pos = minPos;
    if (pos > maxPos) pos = maxPos;

    this.positionPct = pos / this.imageWidth;
    console.log(this, this.positionPct);
  };

  startSliding = (e) => {
    // Prevent default behavior other than mobile scrolling
    if (!("touches" in e)) {
      e.preventDefault();
    }
    // Slide the image even if you just click or tap (not drag)
    this.updateSliderPosition(e);

    window.addEventListener("mousemove", this.updateSliderPosition);
    window.addEventListener("touchmove", this.updateSliderPosition);
  };

  finishSliding = () => {
    console.log("触发。");

    window.removeEventListener("mousemove", this.updateSliderPosition);
    window.removeEventListener("touchmove", this.updateSliderPosition);
  };

  componentDidMount() {
    console.log("this", this);
    new ResizeSensor(this.containerRef.current, () => {
      this.getAndSetImageWidth();
    });
    const containerElement = this.containerRef.current;

    console.log("containerElement", containerElement);

    // for mobile
    containerElement.addEventListener("touchstart", this.startSliding);
    window.addEventListener("touchend", this.finishSliding);

    // for desktop
    if (this.hover) {
      containerElement.addEventListener("mouseenter", this.startSliding);
      containerElement.addEventListener("mouseleave", this.finishSliding);
    } else {
      containerElement.addEventListener("mousedown", this.startSliding);
      window.addEventListener("mouseup", this.finishSliding);
    }
  }

  componentWillUnmount() {
    this.finishSliding();
    window.removeEventListener("mouseup", this.finishSliding);
    window.removeEventListener("touchend", this.finishSliding);
  }

  render() {
    return (
      <div class="vci-container" ref={this.containerRef}>
        <img
          alt={this.leftImageAlt}
          src={this.leftImage}
          style={this.leftImageStyle()}
          class="left-image"
          ref={this.leftImageRef}
        />
        <div style={this.leftImageStyle()} class="left-label">
          {this.leftLabel}
        </div>

        <img
          alt={this.rightImageAlt}
          src={this.rightImage}
          class="right-image"
          ref={this.rightImageRef}
        />
        <div
          style={this.rightLabelStyle()}
          ref={this.rightLabelRef}
          class="right-label"
        >
          {this.rightLabel}
        </div>

        <div style={this.sliderStyle()} class="vci-slider">
          <div style={this.sliderLineStyle()} class="line" />
          <div style={this.sliderHandleStyle()} class="handle">
            <div style={this.sliderLeftArrowStyle()} class="left-arrow" />
            <div style={this.sliderRightArrowStyle()} class="right-arrow" />
          </div>
          <div style={this.sliderLineStyle()} class="line" />
        </div>
      </div>
    );
  }
}

export default QuarkCompareImage;
