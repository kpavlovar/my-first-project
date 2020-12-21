const text = [
	[
		"text11",
		"text12",
		"text13",
		"text14",
	],
	[
		"text21",
		"text22",
		"text23",
		"text24",
	],
	[
		"text31",
		"text32",
		"text33",
		"text34",
	],
	[
		"text41",
		"text42",
		"text43",
		"text44",
	],
	[
		"text51",
		"text52",
		"text53",
		"text54",
	]
]

var hor				= document.querySelector('.hor'),
	allVer			= document.querySelector('.allver'),
	ver				= document.querySelectorAll('.ver'),
	horBut			= document.querySelectorAll('.hor__but'),
	verBut 			= [],
	contentWrapper	= document.querySelector('.content-wrapper');
	content			= document.querySelector('.content');
	tapfield		= document.querySelector('.tapfield');

for (let i = 0; i < ver.length; i++) {
	verBut[i] = ver[i].querySelectorAll('.ver__but');
}

var		hind	= 0,								//по горизонтали
		vind	= [0,0,0,0,0];		//по вертикали

var		vw		= window.innerWidth,
		vh		= window.innerHeight,
		LEFT,
		TOP;

function Resize() {
	vw	= window.innerWidth;
	vh	= window.innerHeight;
	LEFT = 0.3 * vw;
	TOP = 0.3 * vh;
}
Resize();

// !---Listeners---
window.addEventListener('resize', Resize);

for (let i = 0; i < horBut.length; i++) {
	horBut[i].addEventListener('click', HorButClick, false);			//a few LISTENERS
}
for (let i = 0; i < ver.length; i++) {
	for (let j = 0; j < verBut[i].length; j++) {
		verBut[i][j].addEventListener('click', VerButClick, false);		//a lot of LISTENERS
	}
}


// !---functions---
function HorButClick() {
	for (let i = 0; i < horBut.length; i++) {
		if (this == horBut[i]) {
			hind = i;
		}
	}
	HorTrans();
	AllVerTrans();
}
function VerButClick() {
	let timeout = false;
	for (let i = 0; i < verBut[hind].length; i++) {
		if (this !== verBut[hind][i]) {
			timeout = true;
		}
		else {
			vind[hind] = i;
		}
	}
	VerTrans();
	if (timeout) {
		const CallPopUpTime = setTimeout(
			() => {
				CallPopUp();
				clearTimeout(CallPopUpTime);
			}, 200
		);
	}
	else {
		CallPopUp();
	}
}
function HorTrans() {
	let x	= LEFT - (hind * 200)
	hor.style.left = x + 'px';
}
function VerTrans() {
	let y	= - (vind[hind] * 80)
	ver[hind].style.top = y + 'px';
	for (let i = 0; i < verBut[hind].length; i++) {
		verBut[hind][i].classList.remove('ver__selected')
	}
	verBut[hind][vind[hind]].classList.add('ver__selected')
}
function AllVerTrans() {
	let x	= LEFT - (hind * 200)
	allVer.style.left = x + 'px';
	for (let i = 0; i < ver.length; i++) {
		ver[i].classList.remove('allver__selected')
	}
	ver[hind].classList.add('allver__selected')
}
function CallPopUp() {
	hor.style.opacity = '0'
	allVer.style.opacity = '0'
	contentWrapper.style.transform = 'scale(1)'
	content.innerHTML = text[hind][vind[hind]];
	tapfield.addEventListener('click', ClosePopUp, false);
}
function ClosePopUp() {
	tapfield.removeEventListener('click', ClosePopUp, false);
	hor.style.opacity = '1'
	allVer.style.opacity = '1'
	contentWrapper.style.transform = 'scale(0)'
}