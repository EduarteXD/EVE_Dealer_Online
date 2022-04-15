import bodyParser from 'body-parser'
import cookies from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mysql from 'mysql'
import crypto from 'crypto'
import compression from 'compression'
import path from 'path'

const __dirname = path.resolve()
dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended: 'true' }))
app.use(bodyParser.json({ extended: 'true' }))
app.use(cors())
app.use(cookies())
app.use(compression())

const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PWD,
  database: process.env.SQL_NAME
})

const base62 = (id) => {
  var arr = '0123456789qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ'
  var res = ''
  while (id > 0)
  {
      res = arr.substring(id % 62, id % 62 + 1) + res
      id = Math.floor(id / 62)
  }
  return res
}

const genTrackerID = (uid) => {
  var promise = new Promise((resolve, reject) => {
    var now = new Date()
    var id = 'E-' + base62(parseInt(now.getTime() / 1000 + now.getTime() % 1000))
    const md5 = crypto.createHash('md5')
    var token = 'T-' + base62(parseInt(now.getTime() / 10 + now.getTime() % 1000))
    // var token = 'T-' + md5.update(base62(parseInt(now.getTime() / 100))).digest('hex').toUpperCase()
    const deleteParms = [uid]
    connection.query('delete from `trackers` where `uid` = ?', deleteParms, (err) => {
      if (err)
      {
        reject(err)
      }
      const insertParms = [id, token, uid]
      connection.query('insert into `trackers` (`id`, `token`, `uid`) values (?, ?, ?)', insertParms, (err) => {
        if (err)
        {
          reject(err)
        }
        resolve({
          id: id,
          token: token
        })
      })
    })
  })

  return promise
}

const verifyTrackerID = (Tracker) => {
  var promise  = new Promise((resolve, reject) => {
    const queryParams = [Tracker.id, Tracker.token]
    connection.query('select count(*), `uid` from `trackers` where id = ? and token = ?', queryParams, (err, rows) => {
      if (err)
      {
        reject(err)
      }
      if (rows[0]['count(*)'] === 1)
      {
        resolve({
          valid: true,
          uid: rows[0].uid
        })
      }
      else
      {
        resolve({
          valid: false,
          uid: null
        })
      }
    })
  })

  return promise;
}

connection.connect((err) => {
  if (err) {
      console.log('\x1B[31m[Erro] \x1B[0m%s', err.code)
      console.log('[Info] Program will be exit, please check the DB configuration')
      process.exit(0)
  }

  else {
      console.log('[Info] DB Connection Established')
  }
})

app.use(express.static('./public'))

app.get('/api/data/itemlist/version', (req, res) => {
  res.json({
    version: '2204_2'
  })
})

app.get('/api/data/blueprints/version', (req, res) => {
  res.json({
    version: '2205'
  })
})

app.get('/api/data/idtoname/version', (req, res) => {
  res.json({
    version: '2204_2'
  })
})

app.get('/api/data/idtogroup/version', (req, res) => {
  res.json({
    version: '2204'
  })
})

app.get('/api/data/itemgroup/version', (req, res) => {
  res.json({
    version: '2204_4'
  })
})

app.get('/api/data/structurerigs/version', (req, res) => {
  res.json({
    version: '2204'
  })
})

app.get('/api/data/structurerigs', (req, res) => {
  res.sendFile(__dirname + '/data/structurerigs.json')
})

app.get('/api/data/itemgroup', (req, res) => {
  res.sendFile(__dirname + '/data/itemgroup.json')
})

app.get('/api/data/idtogroup', (req, res) => {
  res.sendFile(__dirname + '/data/idtogroup.json')
})

app.get('/api/data/idtoname', (req, res) => {
  res.sendFile(__dirname + '/data/idtoname.json')
})

app.get('/api/data/itemlist', (req, res) => {
  res.sendFile(__dirname + '/data/itemlist.json')
})

app.get('/api/data/blueprints', (req, res) => {
  res.sendFile(__dirname + '/data/blueprints.json')
})

app.get('/api/user', async (req, res) => {
  var response = {
    login: false
  }

  if (req.cookies['tracker-id'] != undefined) {
    var Tracker = {
      id: req.cookies['tracker-id'],
      token: req.cookies['tracker-token'],
    }
    var stat = await verifyTrackerID(Tracker)
    try {
      response = {
        login: stat.valid,
        uid: stat.uid
      }
    }
    catch(err) {
      res.json(response)
      throw err
    }
  }

  res.json(response)
})

app.get('/api/user/info', async (req, res) => {
  var promise = new Promise((resolve, reject) => {
    const queryParams = [req.cookies['tracker-id']]
    connection.query('select `uname`, `email`, `rule` from `users` where `uid` = (select `uid` from `trackers` where `id` = ?)', queryParams, (err, rows) => {
      if (err)
      {
        reject(err)
      }
      const md5 = crypto.createHash('md5')
      if (rows !== undefined)
      {
        resolve({
          name: rows[0].uname,
          avatar: md5.update(rows[0].email).digest('hex'),
          rule: rows[0].rule
        })
      }
      else
      {
        reject({reason: 'noUser'})
      }
    })
  })

  var response = await promise;
  res.json(response)
})

app.get('/api/blueprint/query', async (req, res) => {
  if (req.cookies['tracker-id'] != undefined) {
    var Tracker = {
      id: req.cookies['tracker-id'],
      token: req.cookies['tracker-token'],
    }
    var uinfo = await verifyTrackerID(Tracker)
    if (uinfo.valid)
    {
      const queryParams = [uinfo.uid]
      connection.query('select `bpid`, `mefficent`, `tefficent` from `bpvault` where uid = ?', queryParams, (err, rows) => {
        if (err)
        {
          res.json({ ok: false })
          throw err
        }
        res.json(rows)
      })
    }
    else 
    {
      res.json({ ok: false })
    }
  }
  else
  {
    res.json({ ok: false })
  }
})

app.post('/api/structures/add', async (req, res) => {
  if (req.cookies['tracker-id'] != undefined) {
    var Tracker = {
      id: req.cookies['tracker-id'],
      token: req.cookies['tracker-token']
    }
    var uinfo = await verifyTrackerID(Tracker)
    if (uinfo.valid) {
      const insertParams = [uinfo.uid, req.body.data]
      connection.query('insert into `structures` (`uid`, `data`) values (?, ?)', insertParams, (err) => {
        if (err) {
          res.json({ ok: false })
          throw err
        }
        else {
          res.json({ ok: true })
        }
      })
    }
    else {
      res.json({ ok: false })
    }
  }
  else {
    res.json({ ok: false })
  }
})

app.get('/api/structures/query', async (req, res) => {
  if (req.cookies['tracker-id'] != undefined) {
    var Tracker = {
      id: req.cookies['tracker-id'],
      token: req.cookies['tracker-token']
    }
    var uinfo = await verifyTrackerID(Tracker)
    if (uinfo.valid) {
      const queryParams = [uinfo.uid]
      connection.query('select `data` from `structures` where `uid` = ?', queryParams, (err, rows) => {
        if (err) {
          res.json({ ok: false })
          throw err
        }
        res.json(rows)
      })
    }
    else {
      res.json({ ok: false })
    }
  }
  else
  {
    res.json({ ok: false })
  }
})

app.post('/api/blueprint/add', async (req, res) => {
  if (req.cookies['tracker-id'] != undefined) {
    var Tracker = {
      id: req.cookies['tracker-id'],
      token: req.cookies['tracker-token']
    }
    var uinfo = await verifyTrackerID(Tracker)
    if (uinfo.valid) {
      const queryParams = [uinfo.uid, req.body.id]
      connection.query('select count(*) from `bpvault` where uid = ? and bpid = ?', queryParams, (err, rows) => {
        if (err)
        {
          res.json({ ok: false })
          throw err
        }
        if (rows[0]['count(*)'] === 0)
        {
          const insertParms = [uinfo.uid, req.body.id, req.body.me, req.body.te]
          connection.query('insert into `bpvault` (`uid`, `bpid`, `mefficent`, `tefficent`) values (?, ?, ?, ?)', insertParms, (err) => {
            if (err)
            {
              res.json({ ok: false })
              throw err
            }
            else
            {
              res.json({ ok: true })
            }
          })
        }
        else
        {
          const updateParams = [req.body.me, req.body.te, uinfo.uid, req.body.id]
          connection.query('update `bpvault` set `mefficent` = ?, `tefficent` = ? where `uid` = ? and `bpid` = ?', updateParams, (err) => {
            if (err)
            {
              res.json({ ok: false })
              throw err
            }
            else
            {
              res.json({ ok: true })
            }
          })
        }
      })
    }
    else
    {
      res.json({ ok: false })
    }
  }
  else
  {
    res.json({ ok: false })
  }
})

app.post('/api/login', (req, res) => {
  const queryParams = [req.body.name]
  connection.query('select `pwd`, `uid` from `users` where `uname` = ?', queryParams, async (err, rows) => {
    if (err) {
      res.json({
        ok: false,
        msg: 'DB Error'
      })
      throw err
    }
    const md5 = crypto.createHash('md5')
    var pwd = md5.update(req.body.pwd).digest('hex').toUpperCase()
    if (rows[0] !== undefined)
    {
      if (rows[0].pwd === pwd) {
        try {
          var Tracker = await genTrackerID(rows[0].uid)
          res.cookie('tracker-id', Tracker.id)
          res.cookie('tracker-token', Tracker.token)
          res.json({
            ok: true,
            uid: rows[0].uid
          })
        }
        catch (err) {
          res.json({
            ok: false
          })
        }
      }
      else {
        res.json({
          ok: false
        })
      }
    }
    else {
      res.json({
        ok: false
      })
    }
  })
})

app.listen(process.env.PORT, () => {
  console.log('[Info] Server is running at *:%s ', process.env.PORT)
})