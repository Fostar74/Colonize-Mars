
// Colonize Mars – Final Full Map.jsx with Mines, Alien Bases, and Search UI

import React, { useEffect, useRef, useState } from "react";
import hqIconFile from "../images/hq-icon.png";
import goldMineImg from "../images/mine-gold.png";
import ironMineImg from "../images/mine-iron.png";
import solarMineImg from "../images/mine-solar.png";
import waterMineImg from "../images/mine-water.png";
import alienBaseImg from "../images/alien-base.png";

function Map() {
  const canvasRef = useRef(null);
  const tileSize = 60;
  const mapSize = 200;

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const [castles, setCastles] = useState([]);
  const [hqIcon, setHqIcon] = useState(null);
  const [hoveredTitle, setHoveredTitle] = useState("");
  const [mineIcons, setMineIcons] = useState({});
  const [alienIcon, setAlienIcon] = useState(null);

  const [lastAlienSearch, setLastAlienSearch] = useState(null);
  const [lastMineSearch, setLastMineSearch] = useState([]);

  const mineData = [
    ...[
    {
        "x": 48,
        "y": 15,
        "type": "gold"
    },
    {
        "x": 137,
        "y": 84,
        "type": "gold"
    },
    {
        "x": 26,
        "y": 27,
        "type": "gold"
    },
    {
        "x": 74,
        "y": 55,
        "type": "gold"
    },
    {
        "x": 171,
        "y": 12,
        "type": "gold"
    },
    {
        "x": 99,
        "y": 139,
        "type": "gold"
    },
    {
        "x": 78,
        "y": 174,
        "type": "gold"
    },
    {
        "x": 80,
        "y": 104,
        "type": "gold"
    },
    {
        "x": 82,
        "y": 130,
        "type": "gold"
    },
    {
        "x": 169,
        "y": 87,
        "type": "gold"
    },
    {
        "x": 49,
        "y": 101,
        "type": "gold"
    },
    {
        "x": 137,
        "y": 128,
        "type": "gold"
    },
    {
        "x": 41,
        "y": 154,
        "type": "gold"
    },
    {
        "x": 94,
        "y": 169,
        "type": "gold"
    },
    {
        "x": 144,
        "y": 63,
        "type": "gold"
    },
    {
        "x": 178,
        "y": 28,
        "type": "gold"
    },
    {
        "x": 67,
        "y": 75,
        "type": "gold"
    },
    {
        "x": 26,
        "y": 95,
        "type": "gold"
    },
    {
        "x": 175,
        "y": 84,
        "type": "gold"
    },
    {
        "x": 16,
        "y": 155,
        "type": "gold"
    },
    {
        "x": 164,
        "y": 53,
        "type": "gold"
    },
    {
        "x": 30,
        "y": 123,
        "type": "gold"
    },
    {
        "x": 79,
        "y": 43,
        "type": "gold"
    },
    {
        "x": 30,
        "y": 68,
        "type": "gold"
    },
    {
        "x": 58,
        "y": 26,
        "type": "gold"
    },
    {
        "x": 16,
        "y": 176,
        "type": "gold"
    },
    {
        "x": 33,
        "y": 137,
        "type": "gold"
    },
    {
        "x": 90,
        "y": 12,
        "type": "gold"
    },
    {
        "x": 145,
        "y": 73,
        "type": "gold"
    },
    {
        "x": 90,
        "y": 76,
        "type": "gold"
    }
],
    ...[
    {
        "x": 25,
        "y": 166,
        "type": "iron"
    },
    {
        "x": 156,
        "y": 42,
        "type": "iron"
    },
    {
        "x": 101,
        "y": 51,
        "type": "iron"
    },
    {
        "x": 12,
        "y": 28,
        "type": "iron"
    },
    {
        "x": 125,
        "y": 82,
        "type": "iron"
    },
    {
        "x": 31,
        "y": 99,
        "type": "iron"
    },
    {
        "x": 64,
        "y": 99,
        "type": "iron"
    },
    {
        "x": 154,
        "y": 82,
        "type": "iron"
    },
    {
        "x": 148,
        "y": 22,
        "type": "iron"
    },
    {
        "x": 11,
        "y": 139,
        "type": "iron"
    },
    {
        "x": 42,
        "y": 90,
        "type": "iron"
    },
    {
        "x": 58,
        "y": 49,
        "type": "iron"
    },
    {
        "x": 47,
        "y": 174,
        "type": "iron"
    },
    {
        "x": 31,
        "y": 123,
        "type": "iron"
    },
    {
        "x": 14,
        "y": 128,
        "type": "iron"
    },
    {
        "x": 67,
        "y": 131,
        "type": "iron"
    },
    {
        "x": 106,
        "y": 153,
        "type": "iron"
    },
    {
        "x": 165,
        "y": 172,
        "type": "iron"
    },
    {
        "x": 21,
        "y": 146,
        "type": "iron"
    },
    {
        "x": 164,
        "y": 179,
        "type": "iron"
    },
    {
        "x": 11,
        "y": 132,
        "type": "iron"
    },
    {
        "x": 87,
        "y": 57,
        "type": "iron"
    },
    {
        "x": 112,
        "y": 19,
        "type": "iron"
    },
    {
        "x": 151,
        "y": 166,
        "type": "iron"
    },
    {
        "x": 10,
        "y": 163,
        "type": "iron"
    },
    {
        "x": 70,
        "y": 62,
        "type": "iron"
    },
    {
        "x": 159,
        "y": 36,
        "type": "iron"
    },
    {
        "x": 21,
        "y": 87,
        "type": "iron"
    },
    {
        "x": 20,
        "y": 149,
        "type": "iron"
    },
    {
        "x": 131,
        "y": 147,
        "type": "iron"
    }
],
    ...[
    {
        "x": 82,
        "y": 29,
        "type": "solar"
    },
    {
        "x": 132,
        "y": 112,
        "type": "solar"
    },
    {
        "x": 16,
        "y": 169,
        "type": "solar"
    },
    {
        "x": 106,
        "y": 169,
        "type": "solar"
    },
    {
        "x": 168,
        "y": 46,
        "type": "solar"
    },
    {
        "x": 64,
        "y": 132,
        "type": "solar"
    },
    {
        "x": 130,
        "y": 47,
        "type": "solar"
    },
    {
        "x": 36,
        "y": 12,
        "type": "solar"
    },
    {
        "x": 94,
        "y": 133,
        "type": "solar"
    },
    {
        "x": 113,
        "y": 122,
        "type": "solar"
    },
    {
        "x": 130,
        "y": 71,
        "type": "solar"
    },
    {
        "x": 157,
        "y": 30,
        "type": "solar"
    },
    {
        "x": 43,
        "y": 14,
        "type": "solar"
    },
    {
        "x": 12,
        "y": 173,
        "type": "solar"
    },
    {
        "x": 138,
        "y": 41,
        "type": "solar"
    },
    {
        "x": 116,
        "y": 38,
        "type": "solar"
    },
    {
        "x": 51,
        "y": 42,
        "type": "solar"
    },
    {
        "x": 50,
        "y": 50,
        "type": "solar"
    },
    {
        "x": 96,
        "y": 117,
        "type": "solar"
    },
    {
        "x": 176,
        "y": 110,
        "type": "solar"
    },
    {
        "x": 69,
        "y": 75,
        "type": "solar"
    },
    {
        "x": 172,
        "y": 100,
        "type": "solar"
    },
    {
        "x": 115,
        "y": 45,
        "type": "solar"
    },
    {
        "x": 137,
        "y": 45,
        "type": "solar"
    },
    {
        "x": 168,
        "y": 145,
        "type": "solar"
    },
    {
        "x": 105,
        "y": 71,
        "type": "solar"
    },
    {
        "x": 24,
        "y": 67,
        "type": "solar"
    },
    {
        "x": 171,
        "y": 153,
        "type": "solar"
    },
    {
        "x": 89,
        "y": 111,
        "type": "solar"
    },
    {
        "x": 139,
        "y": 121,
        "type": "solar"
    }
],
    ...[
    {
        "x": 101,
        "y": 36,
        "type": "water"
    },
    {
        "x": 48,
        "y": 179,
        "type": "water"
    },
    {
        "x": 57,
        "y": 69,
        "type": "water"
    },
    {
        "x": 111,
        "y": 116,
        "type": "water"
    },
    {
        "x": 154,
        "y": 157,
        "type": "water"
    },
    {
        "x": 177,
        "y": 125,
        "type": "water"
    },
    {
        "x": 104,
        "y": 31,
        "type": "water"
    },
    {
        "x": 67,
        "y": 131,
        "type": "water"
    },
    {
        "x": 24,
        "y": 114,
        "type": "water"
    },
    {
        "x": 166,
        "y": 85,
        "type": "water"
    },
    {
        "x": 89,
        "y": 155,
        "type": "water"
    },
    {
        "x": 55,
        "y": 153,
        "type": "water"
    },
    {
        "x": 100,
        "y": 39,
        "type": "water"
    },
    {
        "x": 83,
        "y": 87,
        "type": "water"
    },
    {
        "x": 54,
        "y": 109,
        "type": "water"
    },
    {
        "x": 81,
        "y": 10,
        "type": "water"
    },
    {
        "x": 137,
        "y": 70,
        "type": "water"
    },
    {
        "x": 56,
        "y": 121,
        "type": "water"
    },
    {
        "x": 58,
        "y": 60,
        "type": "water"
    },
    {
        "x": 132,
        "y": 104,
        "type": "water"
    },
    {
        "x": 59,
        "y": 65,
        "type": "water"
    },
    {
        "x": 136,
        "y": 98,
        "type": "water"
    },
    {
        "x": 56,
        "y": 145,
        "type": "water"
    },
    {
        "x": 153,
        "y": 99,
        "type": "water"
    },
    {
        "x": 93,
        "y": 145,
        "type": "water"
    },
    {
        "x": 177,
        "y": 38,
        "type": "water"
    },
    {
        "x": 44,
        "y": 82,
        "type": "water"
    },
    {
        "x": 122,
        "y": 68,
        "type": "water"
    },
    {
        "x": 62,
        "y": 176,
        "type": "water"
    },
    {
        "x": 168,
        "y": 114,
        "type": "water"
    }
]
  ];

  const alienBases = [
    {
        "x": 121,
        "y": 152,
        "level": 1
    },
    {
        "x": 41,
        "y": 171,
        "level": 2
    },
    {
        "x": 73,
        "y": 32,
        "level": 3
    },
    {
        "x": 117,
        "y": 157,
        "level": 4
    },
    {
        "x": 114,
        "y": 97,
        "level": 5
    },
    {
        "x": 56,
        "y": 95,
        "level": 6
    },
    {
        "x": 151,
        "y": 24,
        "level": 7
    },
    {
        "x": 17,
        "y": 91,
        "level": 8
    },
    {
        "x": 42,
        "y": 91,
        "level": 9
    },
    {
        "x": 123,
        "y": 35,
        "level": 10
    },
    {
        "x": 179,
        "y": 95,
        "level": 11
    },
    {
        "x": 152,
        "y": 40,
        "level": 12
    },
    {
        "x": 42,
        "y": 77,
        "level": 13
    },
    {
        "x": 24,
        "y": 126,
        "level": 14
    },
    {
        "x": 157,
        "y": 100,
        "level": 15
    },
    {
        "x": 80,
        "y": 103,
        "level": 16
    },
    {
        "x": 104,
        "y": 139,
        "level": 17
    },
    {
        "x": 121,
        "y": 144,
        "level": 18
    },
    {
        "x": 141,
        "y": 79,
        "level": 19
    },
    {
        "x": 23,
        "y": 23,
        "level": 20
    },
    {
        "x": 104,
        "y": 100,
        "level": 21
    },
    {
        "x": 101,
        "y": 171,
        "level": 22
    },
    {
        "x": 59,
        "y": 92,
        "level": 23
    },
    {
        "x": 159,
        "y": 17,
        "level": 24
    },
    {
        "x": 114,
        "y": 18,
        "level": 25
    }
];


//... remaining logic continues ...
