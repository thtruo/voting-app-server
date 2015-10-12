/* This is a little test helper file to plug in `chai-immutable` before
 * any tests are run. The file is referenced in `package.json` as a required
 * file for Mocha.
 *
 * The `chai-immutable` library extends Chai to support comparisons for
 * Immutable data structures.
 */
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);