// For #genuary2025, day 24: "geometric art - pick a shape"
let a, r1, r2, divider, step;
let menuY = -100; // 選單的初始Y位置
const targetMenuY = 10; // 選單要滑到的Y位置
let buttonContainer;

function setup() {
	createCanvas(windowHeight, windowHeight);
	a = 0;
	r1 = height / 2.05;
	r2 = 0;
	background(255);
	divider = random(6, 24);
	step = random(2, 12);
	fill(0);
	noStroke();
	textAlign(LEFT, TOP);
	text("r += " + nf(step, 2, 2), 10, 10);
	textAlign(RIGHT, TOP);
	text("n = " + nf(divider, 2, 2), width - 10, 10);
	
	// 創建選單
	createMenuButtons();
}

function createMenuButtons() {
	buttonContainer = createDiv('');
	buttonContainer.id('menu-container');
	buttonContainer.style('position', 'fixed');
	buttonContainer.style('left', '50%');
	buttonContainer.style('top', menuY + 'px');
	buttonContainer.style('transform', 'translateX(-50%)');
	buttonContainer.style('background-color', 'rgba(255,255,255,0.8)');
	buttonContainer.style('padding', '10px 20px');
	buttonContainer.style('border-radius', '0 0 10px 10px');
	buttonContainer.style('display', 'flex');
	buttonContainer.style('gap', '10px');
	
	// 創建三個按鈕
	const buttons = ['作品一', '作品二', '作品三'].map(label => {
		const btn = createButton(label);
		btn.parent(buttonContainer);
		btn.style('padding', '5px 15px');
		btn.style('border', 'none');
		btn.style('background-color', 'rgba(200,200,200,0.8)');
		btn.style('cursor', 'pointer');
		btn.style('border-radius', '5px');
		return btn;
	});
	
	// 設定按鈕點擊事件
	buttons[0].mousePressed(() => {
		divider = 6;
		step = 2;
		setup();
	});
	
	buttons[1].mousePressed(() => {
		divider = 12;
		step = 6;
		setup();
	});
	
	buttons[2].mousePressed(() => {
		divider = 24;
		step = 12;
		setup();
	});
}

function draw() {
	// 處理選單動畫
	if (mouseY < 100) { // 當滑鼠在上方100像素內
		menuY = lerp(menuY, targetMenuY, 0.1);
	} else {
		menuY = lerp(menuY, -100, 0.1);
	}
	
	// 更新選單位置
	if (buttonContainer) {
		buttonContainer.style('top', menuY + 'px');
	}
	
	if (r2>2*r1) return;
	translate(width / 2, height / 2);
	for (let i = 0; i < divider; i++) {
		noFill();
		stroke(0);
		strokeWeight(map(r2, 0, r1, 0.5, 0.2));
		push();
		translate(cos(a) * (r1 - r2 / 2), sin(a) * (r1 - r2 / 2));
		ellipse(0, 0, r2, r2);
		pop();
		a += TAU / divider
	}
	r2 += step;
}

function mousePressed() {
	setup();
}