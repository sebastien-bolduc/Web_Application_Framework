var includeJSXnaParticleFlag = (typeof includeJSXnaParticleFlag == "undefined") ? false : includeJSXnaParticleFlag;

/**
 * Simple particle simulation for physics.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Vector4.js');

/**
 * My namespace for particle.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Engine.Physics
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Engine == "undefined") {
    JSXna.Engine = {};
}
if (typeof JSXna.Engine.Physics == "undefined") {
    JSXna.Engine.Physics = {};
}

/**
 * Simple particle simulation for physics 
 */
JSXna.Engine.Physics.Particle = class {
    /**
     * Creates a new instance of the class.
     */
    constructor() {
        this.position = new JSXna.Framework.Vector4();
        this.velocity = new JSXna.Framework.Vector4();
        this.mass = 0.0;
        this.forceID = [];
        this.force = [];
        this.forceDirection = [];
    }
    
    /**
     * Return the position of the particle in space.
     * 
     * @returns {Vector4} The position in space of the particle.
     */
    get Position() {
        return this.position;
    }
    
    /**
     * Return the mass of the particle.
     * 
     * @returns {number} the mass of the particle.
     */
    get Mass() {
        return this.mass;
    }
    
    /**
     * Initializes the particle with position, velocity and mass.
     * 
     * @param {Vector4} position - The position of the particle.
     * @param {Vector4} velocity - The velocity of the particle.
     * @param {number} mass - The mass of the particle.
     */
    initializeParticle(position, velocity, mass) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        
        this.applyForce("default", 0, new JSXna.Framework.Vector4(0, 0, 0, 0));
    }
    
    /**
     * Apply a force to the particle.
     * 
     * @param {string} id - The force id.
     * @param {number} force - The force apply to the particle.
     * @param {Vector4} direction - The direction in space of the force applied.
     */
    applyForce(id, force, direction) {
        this.forceID.push(id);
        this.force.push(force);
        this.forceDirection.push(direction);
    }
    
    /**
     * Remove a force applied to the praticle.
     * 
     * @param {string} id - Id of the force to remove.
     */
    removeForce(id) {
        var index = this.forceID.indexOf(id);
        var forceID = [];
        var force = [];
        var forceDirection = [];
        
        if (index != -1) {
            for (var i = 0; i < this.force.length; i++) {
                if (i != index) {
                    forceID.push(this.forceID[i]);
                    force.push(this.force[i]);
                    forceDirection.push(this.forceDirection[i]);
                }
            }
            
            this.forceID = forceID;
            this.force = force;
            this.forceDirection = forceDirection;
        }
    }
    
    /**
     * Compute all the forces applied to the particle.
     * 
     * @returns {Vector4} The sum of all the forces.
     */
    computeForce() {
        var totalForce  = new JSXna.Framework.Vector4();
        
        for (var i = 0; i < this.force.length; i++) {
            totalForce.X += this.force[i] * JSXna.Framework.Vector4.normalize(this.forceDirection[i]).X;
            totalForce.Y += this.force[i] * JSXna.Framework.Vector4.normalize(this.forceDirection[i]).Y;
            totalForce.Z += this.force[i] * JSXna.Framework.Vector4.normalize(this.forceDirection[i]).Z;
        }
        
        return totalForce;
    }
    
    /**
     * Run the physic simulation for the particle.
     * 
     * @param {GameTime} gameTime - The current game time.
     */
    runSimulation(gameTime) {
        var dt = gameTime.ElapsedGameTime.totalSeconds;
        var force = this.computeForce();
        var acceleration = new JSXna.Framework.Vector4(force.X/this.mass, force.Y/this.mass, force.Z/this.mass, 0);
    
        this.velocity.X += acceleration.X * dt;
        this.velocity.Y += acceleration.Y * dt;
        this.velocity.Z += acceleration.Z * dt;
        
        this.position.X += this.velocity.X * dt;
        this.position.Y += this.velocity.Y * dt;
        this.position.Z += this.velocity.Z * dt;
    }
    
    /**
     * Reset the physic simulation for the particle.
     */
    resetSimulation() {
        this.velocity = new JSXna.Framework.Vector4();
        this.forceID = [];
        this.force = [];
        this.forceDirection = [];
        
        this.initializeParticle(this.position, this.velocity, this.mass);
    }
};

// Check if we already included this file...
if (!includeJSXnaParticleFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaParticleFlag = true;
}