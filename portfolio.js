// portfolio.js

// Define the treeData with parent and child nodes
var treeData = {
    "name": "Somin Ramchiary",
    "children": [
      { "name": "Education", "children": [
        { "name": "University", "children": [
          { "name": "Guwahati University", "url":"https://web.gauhati.ac.in/" },
          { "name": "Graduate", "children": [
            { "name": "Bachelor's Degree", "url": "https://drive.google.com/file/d/13-wLCwVfeXLRxSqGvTkPe9c_eMbrDo9X/view?usp=sharing" } // New child node added
          ]}
        ]},
        { "name": "Courses", "children": [
          { "name": "Post Graduation in Data Science"},
          { "name": "SQL Development" }, // New child node added
          { "name": "Backend Development with SQL & PHP" }, // New child node added
        ]},
        { "name": "Certifications", "children": [
            { "name": "Python Master", "url": "https://drive.google.com/file/d/17aQwGEenk_NM3kYeSCwvwRG8cbMbY4ON/view?usp=drive_link" },
            { "name": "SQL Master", "url": "https://drive.google.com/file/d/13Q8A-Z0lNPB0_BInI8AIZLLztMsSA9At/view?usp=drive_link" },
            { "name": "Data Analysis using Python", "url": "https://drive.google.com/file/d/1o8zpwrS1uZth_zvDi52jeq5dYsOpsz6d/view?usp=drive_link" }
          ]
        }
      ]},
      { "name": "Profession", "children": [
        { "name": "Work Experience", "children": [
          { "name": "Firefly Films" },
          { "name": "The Crosscurrent" },
          { "name": "Bada Business Pvt. Ltd." },
          {"name" : "The New Shop"}
        ]},
        { "name": "Skills", "children": [
          { "name": "Data Analysis/SQL/Python" },
          { "name": "Database Development" },
          { "name": "AI/ML Development" }
        ]},
        { "name": "Projects", "children": [
          { "name": "The Crosscurrent Official Web-Dev", "url": "https://thecrosscurrent.in/"},
          { "name": "Firefly Films Web-Dev", "url": "http://thefireflyfilms.com/"},
          { "name": "Bada Business Motion Graphics", "url": "https://www.badabusiness.com/"},
          {"name": "The New Shop Data Scientist", "url": "https://thenewshop.in"}
        ]}
      ]},
      { "name": "Portfolio", "children": [
        { "name": "Mental-Model", "children": [
          { "name": "Mind-Map", "url": "http://sominspace.unaux.com/mindmap.html?i=1" },
          { "name": "Portfolio", "url": "http://sominspace.unaux.com/" }
        ]},
        { "name": "Resume", "children": [
          { "name": "CV", "url": "https://ugc.production.linktr.ee/d354cd07-d3bb-4e29-99fc-4c7555976efb_Somins-Resume.pdf" }
        ]}
      ]},
      { "name": "Projects", "children": [
        { "name": "GitHub", "children": [
          { "name": "Repository 1" },
          { "name": "Repository 2" }      
        ], "url": "https://github.com/SominZex" },
        { "name": "Alien AI", "children": [
          { "name": "Pen 1" },
          { "name": "Pen 2" },
          { "name": "Pen 3" },
          { "name": "Another Pen" } // New child node added
        ], "url": "https://github.com/SominZex/Alien_AI" }
      ]},
      { "name": "Web3 & Metaverse", "children": [
        { "name": "AlienWareLabs NFT Project", "url": "https://dev-alienwarelabs.pantheonsite.io/" },
        { "name": "Metaverse", "url": "https://oncyber.io/alienwarelabspace" }
      ]}
    ]
  };
  
  var margin = { top: 20, right: 120, bottom: 20, left: 120 },
    width = 1200 - margin.right - margin.left,
    height = 600 - margin.top - margin.bottom;
  
  var i = 0,
    duration = 750,
    root;
  
  var tree = d3.layout.tree()
    .size([height, width]);
  
  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });
  
  var svg = d3.select("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  root = treeData;
  root.x0 = height / 2;
  root.y0 = 0;
  
  // Initially hide all child nodes except for the root node
  if (root.children) {
    root.children.forEach(collapse);
    update(root);
  }
  
  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }
  
  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      if (d.url) {
        openPopup(d.url, d.x, d.y);
      } else if (d.name === "Master's Degree") {
        d.children = [
          { name: "Description", url: "https://www.example.com/masters-degree-description" }
        ];
      } else if (d.name === "Firefly Films") {
        d.children = [
          { name: "WebApp Developer" }
        ];
      } else if (d.name === "The Crosscurrent") {
        d.children = [
          { name: "Graphic/Backend Developer" }
        ];
      } else if (d.name === "Bada Business Pvt. Ltd.") {
        d.children = [
          { name: "Motion Graphic Designer" }
        ];
      } else if (d.name === "The New Shop") {
        d.children = [
          { name: "Data Scientist" }
        ];
      } else if (d.name === "Project A" || d.name === "Project B" || d.name === "Project C") {
        d.children = [
          { name: "Project Description", url: "https://www.example.com/" + d.name.toLowerCase().replace(/\s+/g, '-') }
        ];
      } else if (d._children) {
        d.children = d._children;
        d._children = null;
      }
    }
    update(d);
  }
  
  function update(source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);
  
    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });
  
    // Update the nodes…
    var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });
  
    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);
  
    nodeEnter.append("circle")
      .attr("r", 10)
      .style("fill", "#fff")
      .style("stroke", "steelblue")
      .style("stroke-width", "3px");
  
    nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .style("fill-opacity", 1e-6)
      .text(function(d) { return d.name; });
  
    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
  
    nodeUpdate.select("circle")
      .attr("r", 10)
      .style("fill", "#fff")
      .style("stroke", "steelblue")
      .style("stroke-width", "3px");
  
    nodeUpdate.select("text")
      .style("fill-opacity", 1);
  
    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();
  
    nodeExit.select("circle")
      .attr("r", 1e-6);
  
    nodeExit.select("text")
      .style("fill-opacity", 1e-6);
  
    // Update the links…
    var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });
  
    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });
  
    // Transition links to their new position.
    link.transition()
      .duration(duration)
      .attr("d", diagonal);
  
    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      })
      .remove();
  
    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
  
  // Open popup window with the specified URL
  function openPopup(url, x, y) {
    var popupWidth = 500;
    var popupHeight = 500;
    var leftPosition = screen.width / 2 - popupWidth / 2 + 100; // Adjusting position relative to the node
    var topPosition = screen.height / 2 - popupHeight / 2;
  
    window.open(url, "_blank", "width=" + popupWidth + ",height=" + popupHeight + ",top=" + topPosition + ",left=" + leftPosition);
  }
  
